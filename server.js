require("dotenv").config()
const express = require("express")
const { getDada } = require("./automation")
const redis = require("redis")
const fs = require("fs")
const app = express()
client_mongo = new MongoClient(process.env.MONGO_URI || '')
client_mongo.db(process.env.DB_NAME)

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

app.get("/api/v1/alagamentos", async (req, res) => {

  const client_redis = await redis.createClient({url: "redis://0.0.0.0:6379"})
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

  const db = await client_mongo.db(process.env.DB_NAME)
  const connection = await db.collection(process.env.COLLECTION)

  const data = req.body.data

  let result = {}

  const getinfo = await client_redis.get(data)
  if(!getinfo){
    result = await getDada(data)
    await client.set(data, JSON.stringify(result))
  }else {
    result = JSON.parse(getinfo)

  }

  res.status(200).json(result)

})

app.listen(3000, () => console.log('Connected'))