import MongoClient from "../Repositorys/Mongo/MongoClient";
import RedisClient from "../Repositorys/Redis/RedisClient";
import NavigationService from "../Services/PuppeteerService/NavigationService";
import Utils from "../Utils/Utils";

class AlagamentosController {
  private mongoClient: MongoClient;
  private redisClient: RedisClient;
  private navigationService: NavigationService;

  constructor() {
    this.mongoClient = new MongoClient();
    this.redisClient = new RedisClient();
    this.navigationService = new NavigationService();
  }


   execute = async (req: any, res: any) => {
    const body = req.body.data;
    try {
      await Promise.all([
        this.redisClient.connect(),
        this.mongoClient.connect()
      ])
      const findRedis = await this.redisClient.get(body);
      if (!findRedis) {
        const findMongo = await this.mongoClient.find({
          date: Utils.formatData(body),
        });
        if (!findMongo) {
          const result = await this.navigationService.run(body);
          await this.mongoClient.add(result);
          await this.redisClient.set(body, JSON.stringify(result));
          res.status(200).json(result);
        } else {
          await this.redisClient.set(body, JSON.stringify(findMongo));
          res.status(200).json(findMongo);
        }
      } else {
        const findMongo = await this.mongoClient.find({
          date: Utils.formatData(body),
        });
        if (!findMongo) {
          const { _id, ...data } = JSON.parse(findRedis);
          await this.mongoClient.add(data);
        }
        res.status(200).json(JSON.parse(findRedis));
      }
    } catch (error: any) {
      res
        .status(400)
        .json({ reponse: "error", code: 400, message: error.message });
    }
  }
}

export default new AlagamentosController();
