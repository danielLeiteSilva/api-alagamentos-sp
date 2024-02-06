import redis from 'redis'

class RedisConnect {
  private url: any
  constructor() {
    this.url = process.env.REDIS || ''
  }
  
  async connect(): Promise<any> {
    return await redis.createClient({
      url: this.url
    }).on('error', (err: any): any => {
      console.log('Redis Client Error', err)
    }).connect();
  }
}

export default RedisConnect