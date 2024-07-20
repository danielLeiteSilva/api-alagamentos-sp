import ParseHtmlService from "../../../../src/Services/Crapping/ParseHtmlService";
import WebCrappingService from "../../../../src/Services/Crapping/WebCrappingService";

jest.mock('../../../../src/Services/Crapping/WebCrappingService');

describe('ParseHtmlService', () => {
  let parseHtmlService: ParseHtmlService;
  beforeAll(() => {

    parseHtmlService = new ParseHtmlService();
  }) 

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should be return html', async () => {
    (WebCrappingService.prototype.getHTML as jest.Mock).mockResolvedValue({ html: '<html></html>', code: 200, message: '' });
    const html: string = await parseHtmlService.parseHTML('test');
    console.log(html)
  });
});