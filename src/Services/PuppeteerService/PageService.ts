import BrowserService from "./BrowserService";

class PageService{
  private browserService: BrowserService
  constructor() {
    this.browserService = new BrowserService()
  }
  async page() {
    const browser = await this.browserService.browser()
    return await browser.newPage()
  }
}

export default PageService