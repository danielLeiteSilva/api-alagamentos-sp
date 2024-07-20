import request from "request";


type WebCrappingType<T = any> = {
  html?: T,
  code: number,
  message: string
}

class WebCrappingService {
  public getHTML(data: string): Promise<WebCrappingType> {
    return new Promise((resolve, reject) => {
      request(
        `${process.env.ALAGAMENTOS}?dataBusca=${data}&enviaBusca=Buscar`,
        (error, response, body) => {
          if (!error) {
            if (response.statusCode === 200) {
              const result: WebCrappingType = {
                html: body, 
                code: 200, 
                message: '' 
              }
              resolve(result);
            } else {
              reject({ html: '', code: response.statusCode, message: response });
            }
          } else {
            reject({ html: '', code: response.statusCode, message: error.message });
          }
        },
      );
    });
  }
}

export default WebCrappingService;
