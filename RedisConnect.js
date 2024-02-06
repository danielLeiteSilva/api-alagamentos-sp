const redis = require("redis")

class RedisConnect {
  constructor() {
    this.url = process.env.REDIS
  }
  
  async connect() {
    return await redis.createClient({
      url: this.url
    }).on('error', err => {
      console.log('Redis Client Error', err)
    }).connect();
  }
}

module.exports = RedisConnect