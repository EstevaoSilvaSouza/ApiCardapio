"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const validateToken = (req, res) => {
    var _a, _b;
    return res.status(200).json({ message: 'token valido', data: `${(_a = req === null || req === void 0 ? void 0 : req.User) === null || _a === void 0 ? void 0 : _a.Name} ${(_b = req === null || req === void 0 ? void 0 : req.User) === null || _b === void 0 ? void 0 : _b.FullName}`, returnCode: 30 });
};
exports.validateToken = validateToken;
