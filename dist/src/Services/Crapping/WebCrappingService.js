"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
class WebCrappingService {
    getHTML(data) {
        return new Promise((resolve, reject) => {
            (0, request_1.default)(`${process.env.ALAGAMENTOS}?dataBusca=${data}&enviaBusca=Buscar`, (error, response, body) => {
                if (!error) {
                    if (response.statusCode === 200) {
                        resolve({ html: body, code: 200, message: '' });
                    }
                    else {
                        reject({ html: '', code: response.statusCode, message: response });
                    }
                }
                else {
                    reject({ html: '', code: response.statusCode, message: error.message });
                }
            });
        });
    }
}
exports.default = WebCrappingService;
