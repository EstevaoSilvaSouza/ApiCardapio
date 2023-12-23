"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createService_1 = require("../../../service/user/createService");
const authUserService_1 = require("../../../service/user/authUserService");
const checkTypeResponse_1 = require("../../../types/checkTypeResponse");
const authUserTokenGenerate_1 = require("../../../types/authUserTokenGenerate");
class UserController {
    async NewUser(req, res) {
        const payload = req.body;
        if (!payload)
            return res.status(500).json();
        try {
            const create = await createService_1._CreateUserService.handleExecute(payload);
            if (!(create === null || create === void 0 ? void 0 : create.Id))
                return res.status(404).json({ error: create });
            return res.status(200).json(create);
        }
        catch ({ error }) {
            console.error(error);
            return res.status(500).json({
                Message: (error === null || error === void 0 ? void 0 : error.message) || 'Erro desconhecido',
                Data: new Date(),
                Error: error
            });
        }
    }
    async AuthUser(req, res) {
        const { Username, Password } = req.body;
        if (!Username || !Password)
            return res.status(404).json({ message: 'Usuario/Senha em branco!' });
        try {
            const validateAuth = await authUserService_1._AuthUser.handleExecute({ Username, Password });
            if ((0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).status === 403 || (0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).status === 404 || (0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).status === 401)
                return res.status((0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).status).json({ message: (0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).message, returnCode: validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num });
            return res.status(200).json({ message: (0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).message, returnCode: validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num, token: (0, authUserTokenGenerate_1.AuthTokenGenerate)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.obj) });
        }
        catch ({ error }) {
            return res.status(500).json({
                Message: (error === null || error === void 0 ? void 0 : error.message) || 'Erro desconhecido',
                Data: new Date(),
                Error: error
            });
        }
    }
}
exports.default = UserController;
