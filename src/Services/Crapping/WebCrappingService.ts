import request from "request";

class WebCrappingService {
  public getHTML(data: string): any {
    return new Promise((resolve, reject) => {
      request(
        `${process.env.ALAGAMENTOS}?dataBusca=${data}&enviaBusca=Buscar`,
        (error, response, body) => {
          if (!error) {
            if (response.statusCode === 200) {
              resolve({ html: body, code: 200, message: '' });
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
