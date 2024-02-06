require("dotenv").config()

const express = require("express")
const fs = require("fs")
const app = express()

const { getDada } = require("./automation")
const MongoClient = require("./MongoClient")
const RedisClient = require("./RedisClient")

const mongoClient = new MongoClient()
const redisClient = new RedisClient()


const swaggerUi = require('swagger-ui-express');
const buffer = fs.readFileSync("./swagger-output.json")
const base64 = Buffer.from(buffer).toString()
const toJson = JSON.parse(base64)

//Use
app.use('/api/v1/swagger-ui', swaggerUi.serve, swaggerUi.setup(toJson));

app.use(express.json())

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "ok",
    connected: true
  })
})

function formatData(date){
  return date.split("/").join("-")
}

app.get("/api/v1/alagamentos", async (req, res) => {
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
      if(!findMongo){
        const {_id, ...data} = JSON.parse(findRedis)
        await mongoClient.add(data)
      }
      res.status(200).json(JSON.parse(findRedis))
    }
  } catch (error) {
    res.status(400).json({ reponse: 'error', code: 400, message: error.message })
  }
})

app.listen(3000, () => console.log('Connected'))