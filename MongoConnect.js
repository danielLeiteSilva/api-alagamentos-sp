const { MongoClient } = require('mongodb')

class MongoConnect {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI)
  }
  async connect() {
    return this.client.db(process.env.DB_NAME)
  }
  async repository() {
    const db = await this.connect()
    return db.collection(process.env.COLLECTION)
  }
}

module.exports = MongoConnect