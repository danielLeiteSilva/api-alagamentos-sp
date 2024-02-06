const RedisConnect = require("./RedisConnect");

class RedisClient extends RedisConnect {
  constructor() {
    super()
  }

  async get(key) {
    const client = await this.connect()
    return await client.get(key)
  }

  async set(key, value) {
    const client = await this.connect()
    return await client.set(key, value)
  }
}

module.exports = RedisClient