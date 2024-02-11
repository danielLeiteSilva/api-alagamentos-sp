import { Collection, Db, MongoClient } from 'mongodb'

class MongoConnect {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI || '')
  }
  async connect(): Promise<Db> {
    return this.client.db(process.env.DB_NAME)
  }
  async repository(): Promise<Collection<Document>> {
    const db: Db = await this.connect()
    return db.collection(process.env.COLLECTION || '')
  }
}

export default MongoConnect