import MongoClient from "../Repositorys/Mongo/MongoClient";
import RedisClient from "../Repositorys/Redis/RedisClient";
import Strategy from "../Strategy/Strategy";
import Utils from "../Utils/Utils";

class AlagamentosPeriodoController {
  private mongoClient: MongoClient;
  private redisClient: RedisClient;
  private strategy: Strategy

  constructor() {
    this.mongoClient = new MongoClient();
    this.redisClient = new RedisClient();
    this.strategy = new Strategy();
  }

  private async getListLocals(
    req: any,
    redisClient: RedisClient,
    mongoClient: MongoClient,
    callback: Strategy): Promise<any[]> {

    let result: Array<any> = [];
    let start_date = new Date(Utils.formatAmericanDate(req.body.start_date));
    let end_date = new Date(Utils.formatAmericanDate(req.body.end_date));

    for (let current_date = new Date(start_date);
      current_date <= end_date;
      current_date.setDate(current_date.getDate() + 1)) {
      result.push(await callback.run(redisClient,
        mongoClient,
        Utils.formatBrazilianDate(current_date)));
    }
    return result;
  }

  execute = async (req: any, res: any) => {
    try {
      await Promise.all([
        this.redisClient.connect(),
        this.mongoClient.connect()
      ])
      const result: any = await this.getListLocals(
        req,
        this.redisClient,
        this.mongoClient,
        this.strategy
      )
      res.status(200).json(result);

    } catch (error: any) {
      res
        .status(400)
        .json({ reponse: "error", code: 400, message: error.message });
    }
  }
}

export default new AlagamentosPeriodoController();
