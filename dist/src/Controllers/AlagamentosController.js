"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient_1 = __importDefault(require("../Repositorys/Mongo/MongoClient"));
const RedisClient_1 = __importDefault(require("../Repositorys/Redis/RedisClient"));
const Strategy_1 = __importDefault(require("../Strategy/Strategy"));
class AlagamentosController {
    constructor() {
        this.execute = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const date = req.body.data;
            try {
                yield Promise.all([
                    this.redisClient.connect(),
                    this.mongoClient.connect()
                ]);
                const result = yield this.strategy.run(this.redisClient, this.mongoClient, date);
                res.status(200).json(result);
            }
            catch (error) {
                res
                    .status(400)
                    .json({ reponse: "error", code: 400, message: error.message });
            }
        });
        this.mongoClient = new MongoClient_1.default();
        this.redisClient = new RedisClient_1.default();
        this.strategy = new Strategy_1.default();
    }
}
exports.default = new AlagamentosController();
