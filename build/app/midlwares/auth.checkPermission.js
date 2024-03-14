"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPermission = void 0;
const CheckPermission = (permissions) => {
    return (req, res, next) => {
        ValidatePermission(permissions, req, res, next);
    };
};
exports.CheckPermission = CheckPermission;
const ValidatePermission = (per, req, res, next) => {
    const userPermission = req.User.Type;
    if (per.some((a) => a.includes(userPermission))) {
        next();
    }
    else {
        return res.status(401).json({ message: 'Permissão invalida!!' });
    }
};
