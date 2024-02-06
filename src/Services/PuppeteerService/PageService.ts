import BrowserService from "./BrowserService";

class PageService {
  private browserService: BrowserService
  constructor() {
    this.browserService = new BrowserService()
  }
  async instance() {
    const browser = await this.browserService.browser()
    const page = await browser.newPage()
    return { browser, page }
  }
}

export default PageService