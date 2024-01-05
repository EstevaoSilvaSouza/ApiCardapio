"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenGenerate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const globalConfi_1 = require("./globalConfi");
const AuthTokenGenerate = (obj) => {
    try {
        if (obj) {
            const { Id, Name, FullName, Stores } = obj;
            return jsonwebtoken_1.default.sign({ Id, Name, FullName, Stores }, globalConfi_1.ObjGlobal.passwordTokenGenerate, { expiresIn: '1h' });
        }
    }
    catch (error) {
        return error;
    }
};
exports.AuthTokenGenerate = AuthTokenGenerate;
