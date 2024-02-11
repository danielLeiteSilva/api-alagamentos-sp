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
const AddressModel_1 = __importDefault(require("../../Models/AddressModel"));
const GoogleService_1 = __importDefault(require("../Google/GoogleService"));
const Utils_1 = __importDefault(require("../../Utils/Utils"));
const ParseHtmlService_1 = __importDefault(require("../Crapping/ParseHtmlService"));
const html_entities_1 = require("html-entities");
class NavigationService {
    constructor() {
        this.ID_CLASS = ".arial-descr-alag.col-local";
        this.googleService = new GoogleService_1.default();
        this.parseHtmlService = new ParseHtmlService_1.default();
    }
    exec(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.parseHtmlService.parseHTML(data);
            const elements = Array.from(document.querySelectorAll(this.ID_CLASS), (elements) => {
                return elements["innerText"];
            });
            return elements.map((element) => {
                return (0, html_entities_1.decode)(element.toLowerCase() + " - são paulo, sp");
            });
        });
    }
    run(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = [];
            const elements = yield this.exec(data);
            try {
                for (let element of elements) {
                    const result = yield this.googleService.getCoordinates(Utils_1.default.formatAddress(element));
                    address.push(new AddressModel_1.default(Utils_1.default.formatAddress(element), result.message, Utils_1.default.formatHour(element)));
                }
            }
            catch (error) {
                console.log(error);
            }
            return {
                date: Utils_1.default.formatData(data),
                address,
            };
        });
    }
}
exports.default = NavigationService;
