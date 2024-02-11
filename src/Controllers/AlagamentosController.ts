import MongoClient from "../Repositorys/Mongo/MongoClient";
import RedisClient from "../Repositorys/Redis/RedisClient";
import Strategy from "../Strategy/Strategy";

class AlagamentosController {
  private mongoClient: MongoClient;
  private redisClient: RedisClient;
  private strategy: Strategy

  constructor() {
    this.mongoClient = new MongoClient();
    this.redisClient = new RedisClient();
    this.strategy = new Strategy();
  }

  execute = async (req: any, res: any) => {
    const date = req.body.data;
    try {
      await Promise.all([
        this.redisClient.connect(),
        this.mongoClient.connect()
      ])
      const result: any = await this.strategy.run(this.redisClient, this.mongoClient, date)
      res.status(200).json(result);
      
    } catch (error: any) {
      res
        .status(400)
        .json({ reponse: "error", code: 400, message: error.message });
    }
  }
}

export default new AlagamentosController();
