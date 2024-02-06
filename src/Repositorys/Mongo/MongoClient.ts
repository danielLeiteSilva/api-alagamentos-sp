import { WithId } from "mongodb"
import MongoConnect from "./MongoConnect"

class MongoClient {
  private client: MongoConnect
  constructor() {
    this.client = new MongoConnect()
  }

  async find(query: object): Promise<WithId<Document> | null> {
    const connect: any = await this.client.repository()
    return await connect.findOne(query)
  }

  async add(data: any): Promise<WithId<Document> | null> {
    const connect = await this.client.repository()
    const info = await connect.findOne(data)
    if (!info) {
      await connect.insertOne(data)
      return await connect.findOne(data)
    }
    return info
  }
}

export default MongoClient