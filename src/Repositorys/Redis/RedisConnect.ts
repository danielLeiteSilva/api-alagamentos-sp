
import * as redis from 'redis';

class RedisConnect {
  private url: any
  constructor() {
    this.url = process.env.REDIS || ''
  }

  public async connection(): Promise<any> {
    return await redis.createClient({
      url: this.url,
      socket: {
        tls: true,
        rejectUnauthorized: false
      },
    }).on('error', (err: any): any => {
      console.log('Redis Client Error', err)
    }).connect();
  }
}

export default RedisConnect