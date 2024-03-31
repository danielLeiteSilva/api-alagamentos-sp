import path from 'path'
import fs from "fs"

class SwaggerService{
  private buffer: any
  constructor() {
    this.buffer = fs.readFileSync(path.join(__dirname, '../../..', 'swagger-output.json'))
  }

  toJson() {
    const base64: string = Buffer.from(this.buffer).toString()
    return JSON.parse(base64)
  }

}

export default new SwaggerService