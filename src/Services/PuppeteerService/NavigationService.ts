import AddressModel from "../../Models/AddressModel";
import GoogleService from "../Google/GoogleService";

import Utils from "../../Utils/Utils";
import ParseHtmlService from "../Crapping/ParseHtmlService";

import { decode } from 'html-entities'

class NavigationService {
  private readonly ID_CLASS: string = ".arial-descr-alag.col-local";
  private parseHtmlService: ParseHtmlService;
  private googleService: GoogleService;

  constructor() {
    this.googleService = new GoogleService();
    this.parseHtmlService = new ParseHtmlService();
  }

  private async exec(data: string): Promise<any> {
    const document = await this.parseHtmlService.parseHTML(data);

    const elements = Array.from(
      document.querySelectorAll(this.ID_CLASS),
      (elements: any): any => {
        return elements["innerText"];
      },
    );

    console.log(elements)

    return elements.map((element: string): string => {
      return decode(element.toLowerCase() + " - são paulo, sp");
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
