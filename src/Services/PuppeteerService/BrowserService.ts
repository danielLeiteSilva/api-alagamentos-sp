import puppeteer, { Browser, PuppeteerNode } from "puppeteer"

class BrowserService {
  private puppeteer: PuppeteerNode
  constructor() {
    this.puppeteer = puppeteer
  }

  async browser(): Promise<Browser> {
    return await this.puppeteer.launch({ headless: true });
  }
}

export default BrowserService