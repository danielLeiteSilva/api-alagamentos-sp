import parse from "node-html-parser";
import WebCrappingService from "./WebCrappingService";

class ParseHtmlService {
  private webCrappingService: WebCrappingService;

  constructor() {
    this.webCrappingService = new WebCrappingService();
  }

  public async parseHTML(data: string): Promise<any> {
    const html = await this.webCrappingService.getHTML(data);
    return parse(html);
  }
}

export default ParseHtmlService;
