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
const request_1 = __importDefault(require("request"));
class GoogleService {
    getCoordinates(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                try {
                    request_1.default.get(`${process.env.GOOGLE_URL}?address=${encodeURI(address)}&key=${process.env.GOOGLE_TOKEN}`, (error, response, body) => {
                        var _a;
                        if (!error) {
                            if (response.statusCode === 200) {
                                const result = (_a = JSON.parse(body)['results'][0]) === null || _a === void 0 ? void 0 : _a.geometry;
                                resolve({
                                    message: result === null || result === void 0 ? void 0 : result.location,
                                    code: response.statusCode
                                });
                            }
                            else {
                                resolve({
                                    message: "Not possible resolve request",
                                    code: response.statusCode
                                });
                            }
                        }
                        else {
                            resolve({
                                message: error,
                                code: response.statusCode
                            });
                        }
                    });
                }
                catch (Exception) {
                    resolve({
                        message: Exception,
                        code: 404
                    });
                }
            });
        });
    }
}
exports.default = GoogleService;
