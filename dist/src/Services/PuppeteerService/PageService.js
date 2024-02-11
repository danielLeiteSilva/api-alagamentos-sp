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
const BrowserService_1 = __importDefault(require("./BrowserService"));
class PageService {
    constructor() {
        this.browserService = new BrowserService_1.default();
    }
    openBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield this.browserService.browser();
        });
    }
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.close();
        });
    }
    openPage() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.browser.newPage();
        });
    }
}
exports.default = PageService;
