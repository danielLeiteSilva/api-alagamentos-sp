import MongoClient from "../Repositorys/Mongo/MongoClient";
import RedisClient from "../Repositorys/Redis/RedisClient";
import NavigationService from "../Services/PuppeteerService/NavigationService";
import Utils from "../Utils/Utils";

class Strategy {
  private navigationService: NavigationService
  constructor() {
    this.navigationService = new NavigationService();
  }
  async run(redisClient: RedisClient, mongoClient: MongoClient, date: string): Promise<any>{
    const findRedis = await redisClient.get(date);
      if (!findRedis) {
        const findMongo = await mongoClient.find({
          date: Utils.formatData(date),
        });
        if (!findMongo) {
          const result = await this.navigationService.run(date);
          await mongoClient.add(result);
          await redisClient.set(date, JSON.stringify(result));
          return  result
        } else {
          await redisClient.set(date, JSON.stringify(findMongo));
          return findMongo
        }
      } else {
        const findMongo = await mongoClient.find({
          date: Utils.formatData(date),
        });
        if (!findMongo) {
          const { _id, ...data } = JSON.parse(findRedis);
          await mongoClient.add(data);
        }
        return JSON.parse(findRedis)
      }
  }
}

export default Strategy