import RedisConnect from "./RedisConnect";

class RedisClient extends RedisConnect {
  private client: any;
  constructor() {
    super();
    this.client = {}
  }

  async connect(): Promise<void> {
    this.client = await this.connection();
  }

  async get(key: string): Promise<any> {
    return await this.client.get(key);
  }

  async set(key: string, value: any): Promise<any> {
    return await this.client.set(key, value);
  }
}

export default RedisClient;
