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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NavigationService_1 = __importDefault(require("../Services/PuppeteerService/NavigationService"));
const Utils_1 = __importDefault(require("../Utils/Utils"));
class Strategy {
    constructor() {
        this.navigationService = new NavigationService_1.default();
    }
    run(redisClient, mongoClient, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const findRedis = yield redisClient.get(date);
            if (!findRedis) {
                const findMongo = yield mongoClient.find({
                    date: Utils_1.default.formatData(date),
                });
                if (!findMongo) {
                    const result = yield this.navigationService.run(date);
                    yield mongoClient.add(result);
                    yield redisClient.set(date, JSON.stringify(result));
                    return result;
                }
                else {
                    yield redisClient.set(date, JSON.stringify(findMongo));
                    return findMongo;
                }
            }
            else {
                const findMongo = yield mongoClient.find({
                    date: Utils_1.default.formatData(date),
                });
                if (!findMongo) {
                    const _a = JSON.parse(findRedis), { _id } = _a, data = __rest(_a, ["_id"]);
                    yield mongoClient.add(data);
                }
                return JSON.parse(findRedis);
            }
        });
    }
}
exports.default = Strategy;
