import BrowserService from "./BrowserService";

class PageService {
  private browserService: BrowserService;
  private browser: any;

  constructor() {
    this.browserService = new BrowserService();
  }

  async openBrowser(): Promise<any> {
    this.browser = await this.browserService.browser();
  }

  async closeBrowser(): Promise<any> {
    await this.browser.close();
  }

  async openPage(): Promise<any> {
    return await this.browser.newPage();
  }
}

export default PageService;
