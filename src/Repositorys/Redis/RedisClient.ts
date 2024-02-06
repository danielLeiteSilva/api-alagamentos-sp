const RedisConnect = require("./RedisConnect");

class RedisClient extends RedisConnect {
  constructor() {
    super()
  }

  async get(key: string): Promise<any> {
    const client = await this.connect()
    return await client.get(key)
  }

  async set(key: string, value: any): Promise<any> {
    const client = await this.connect()
    return await client.set(key, value)
  }
}

export default RedisClient