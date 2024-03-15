"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuhHttpOnly = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuhHttpOnly = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a._xc0d3_t0k3n;
    if (!token)
        return res.status(401).json({ Date: new Date(), isAuth: false });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, '1234');
        req.User = decoded;
        console.log(req.User);
        //console.log(req)
        next();
        // USAR AQUI O NEXT E COLOCAR DENTRO DO REQ.USER O DECODED!!  res.status(200).json({Date:new Date(),isAuth:true,Data:decoded});    
    }
    catch (error) {
        res.status(401).json({ Date: new Date(), isAuth: false });
        console.error(error);
    }
};
exports.AuhHttpOnly = AuhHttpOnly;
