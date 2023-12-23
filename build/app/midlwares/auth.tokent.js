"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const globalConfi_1 = require("../../types/globalConfi");
const AuthUser = (req, res, next) => {
    const AssignatureTokenBearer = req.headers['authorization'];
    if ((AssignatureTokenBearer === null || AssignatureTokenBearer === void 0 ? void 0 : AssignatureTokenBearer.split(' ')[0]) !== 'Bearer')
        return res.status(401).json({ message: 'Token nulo/invalido - utilize Bearer valido.' });
    if ((AssignatureTokenBearer === null || AssignatureTokenBearer === void 0 ? void 0 : AssignatureTokenBearer.split(' ')[1]) === null || (AssignatureTokenBearer === null || AssignatureTokenBearer === void 0 ? void 0 : AssignatureTokenBearer.split(' ')[1]) === undefined)
        return res.status(401).json({ message: 'Token Nulo verifique e envie Novamente.' });
    jsonwebtoken_1.default.verify(AssignatureTokenBearer === null || AssignatureTokenBearer === void 0 ? void 0 : AssignatureTokenBearer.split(' ')[1], globalConfi_1.ObjGlobal.passwordTokenGenerate, (error, decoded) => {
        if (error)
            return res.status(401).json({ message: 'Token expirado', Auth: false });
        req.User = decoded;
        console.log(req.User.Id);
        next();
    });
};
exports.AuthUser = AuthUser;
