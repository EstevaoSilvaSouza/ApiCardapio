"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const validateToken = (req, res) => {
    const userStore = req.User.Stores[0].Name;
    return res.status(200).json({ message: 'token valido', data: userStore, returnCode: 30 });
};
exports.validateToken = validateToken;
