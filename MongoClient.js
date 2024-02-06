const MongoConnect = require("./MongoConnect");

class MongoClient{
  constructor() {
    this.client = new MongoConnect()
  }

  async find(query) {
    const connect = await this.client.repository()
    return await connect.findOne(query)
  }

  async add(data) {
    const connect = await this.client.repository()
    const info = await connect.findOne(data)
    if (!info) {
      return await connect.insertOne(data)
    }
    return info
  }
}

module.exports = MongoClient