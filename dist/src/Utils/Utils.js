"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static sleep() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }
    static formatAddress(data) {
        return data.split("\n")[1];
    }
    static formatHour(data) {
        return data.split("\n")[0];
    }
    static formatData(date) {
        return date.split("/").join("-");
    }
    static formatAmericanDate(date) {
        const [day, month, year] = date.split('/');
        return `${month}/${day}/${year}`;
    }
    static formatBrazilianDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    static differenceInDays(start_date, end_date) {
        const differenceInMilliseconds = end_date - start_date;
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return differenceInDays;
    }
}
exports.default = Utils;
