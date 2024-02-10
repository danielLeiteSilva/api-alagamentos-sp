import request from "request";

class WebCrappingService {
  public getHTML(data: string): any {
    return new Promise((resolve, reject) => {
      request(
        `${process.env.CGESP}?dataBusca=${data}&enviaBusca=Buscar`,
        (error, response, body) => {
          if (!error) {
            if (response.statusCode === 200) {
              resolve(body);
            } else {
              reject(response);
            }
          } else {
            reject(error.message);
          }
        },
      );
    });
  }
}

export default WebCrappingService;
