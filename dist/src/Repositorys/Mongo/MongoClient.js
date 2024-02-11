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
const MongoConnect_1 = __importDefault(require("./MongoConnect"));
class MongoClient {
    constructor() {
        this.client = new MongoConnect_1.default();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.repository = yield this.client.repository();
        });
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne(query);
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.repository.findOne(data);
            if (!info) {
                yield this.repository.insertOne(data);
                return yield this.repository.findOne(data);
            }
            return info;
        });
    }
}
exports.default = MongoClient;
