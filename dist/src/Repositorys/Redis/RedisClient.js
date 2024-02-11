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
const RedisConnect_1 = __importDefault(require("./RedisConnect"));
class RedisClient extends RedisConnect_1.default {
    constructor() {
        super();
        this.client = {};
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = yield this.connection();
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.get(key);
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.set(key, value);
        });
    }
}
exports.default = RedisClient;
