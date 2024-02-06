
class AlagamentosController {
  constructor() {

  }

  async execute(req: any, res: any) {
    const body = req.body.data
    try {
      const findRedis = await redisClient.get(body)
      if (!findRedis) {
        const findMongo = await mongoClient.find({ date: formatData(body) })
        if (!findMongo) {
          const result = await getDada(body)
          await mongoClient.add(result)
          await redisClient.set(body, JSON.stringify(result))
          res.status(200).json(result)
        } else {
          await redisClient.set(body, JSON.stringify(findMongo))
          res.status(200).json(findMongo)
        }
      } else {
        const findMongo = await mongoClient.find({ date: formatData(body) })
        if (!findMongo) {
          const { _id, ...data } = JSON.parse(findRedis)
          await mongoClient.add(data)
        }
        res.status(200).json(JSON.parse(findRedis))
      }
    } catch (error) {
      res.status(400).json({ reponse: 'error', code: 400, message: error.message })
    }
  }
}