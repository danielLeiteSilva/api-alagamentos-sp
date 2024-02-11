"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class SwaggerService {
    constructor() {
        this.buffer = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../../..', 'swagger-output.json'));
    }
    toJson() {
        const base64 = Buffer.from(this.buffer).toString();
        return JSON.parse(base64);
    }
}
exports.default = new SwaggerService;
