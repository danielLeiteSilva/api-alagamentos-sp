import AddressModel from "../../Models/AddressModel";
import GoogleService from "../Google/GoogleService";
import PageService from "./PageService";
import Utils from "../../Utils/Utils";

class NavigationService {
  private readonly ID_BUSCA_XPATH: string = '//*[@id="campoBusca"]';
  private readonly ID_CLASS: string = ".arial-descr-alag.col-local";
  private readonly ID_BUSCA: string = "#campoBusca";
  private readonly ID_ENVIA_BUSCA: string = "#enviaBusca";

  private pageService: PageService;
  private googleService: GoogleService;

  constructor() {
    this.pageService = new PageService();
    this.googleService = new GoogleService();
  }
  private async exec(data: string): Promise<any> {
    const instance: any = await this.pageService.instance();

    const browser: any = await instance().browser;
    const page: any = await instance().page;

    await page.goto(process.env.ALAGAMENTOS);
    await page.setViewport({
      width: 1080,
      height: 1024,
    });
    await page.$eval(this.ID_BUSCA, (input: any): string => {
      return (input.value = "");
    });
    const search: any = await page.$x(this.ID_BUSCA_XPATH);
    await search[0].type(data);
    await page.click(this.ID_ENVIA_BUSCA);
    let elements: any = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(this.ID_CLASS),
        (elements: any): any => {
          return elements["innerText"];
        },
      );
    });
    await Utils.sleep();
    await page.close();
    await browser.close();

    return elements.map((element: string): string => {
      return element.toLowerCase() + " - são paulo, sp";
    });
  }

  public async run(data: string): Promise<Object> {
    const address: Array<AddressModel> = [];
    const elements: any = await this.exec(data);
    try {
      for (let element of elements) {
        const result = await this.googleService.getCoordinates(
          Utils.formatAddress(element),
        );
        address.push(
          new AddressModel(
            Utils.formatAddress(element),
            result.message,
            Utils.formatHour(element),
          ),
        );
      }
    } catch (error: any) {
      console.log(error);
    }
    return {
      date: Utils.formatData(data),
      address,
    };
  }
}

export default NavigationService;
