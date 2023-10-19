"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericData {
    constructor(payload) {
        this.returnData = () => {
            return this.data;
        };
        this.data = payload;
    }
}
exports.default = GenericData;
