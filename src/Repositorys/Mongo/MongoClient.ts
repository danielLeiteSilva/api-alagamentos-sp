import { WithId } from "mongodb";
import MongoConnect from "./MongoConnect";

class MongoClient {
  private client: MongoConnect;
  private repository: any;

  constructor() {
    this.client = new MongoConnect();
  }

  async connect(): Promise<void> {
    this.repository = await this.client.repository();
  }

  async find(query: object): Promise<WithId<Document> | null> {
    return await this.repository.findOne(query);
  }

  async add(data: any): Promise<WithId<Document> | null> {
    const info = await this.repository.findOne(data);
    if (!info) {
      await this.repository.insertOne(data);
      return await this.repository.findOne(data);
    }
    return info;
  }
}

export default MongoClient;
