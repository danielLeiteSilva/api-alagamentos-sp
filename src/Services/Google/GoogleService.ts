import request from 'request'

class GoogleService {
  async getCoordinates(address: string): Promise<any> {
    return new Promise(resolve => {
      try {
        request.get(`${process.env.GOOGLE_URL}?address=${encodeURI(address)}&key=${process.env.GOOGLE_TOKEN}`,
          (error: any, response: any, body: any) => {
            if (!error) {
              if (response.statusCode === 200) {
                const { location } = JSON.parse(body)['results'][0]['geometry']
                resolve({
                  message: location,
                  code: response.statusCode
                })
              } else {
                resolve({
                  message: "Not possible resolve request",
                  code: response.statusCode
                })
              }
            } else {
              resolve({
                message: error,
                code: response.statusCode
              })
            }
          })
      } catch (Exception) {
        resolve({
          message: Exception,
          code: 404
        })
      }
    })
  }
}

export default GoogleService