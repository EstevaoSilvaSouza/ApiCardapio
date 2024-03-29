"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createService_1 = require("../../../service/user/createService");
const authUserService_1 = require("../../../service/user/authUserService");
const checkTypeResponse_1 = require("../../../types/checkTypeResponse");
const authUserTokenGenerate_1 = require("../../../types/authUserTokenGenerate");
const findByIdUser_1 = require("../../../service/user/findByIdUser");
const FindAllUserByStore_1 = require("../../../service/user/FindAllUserByStore");
const createUserService_1 = require("../../../service/user/createUserService");
class UserController {
    async NewUser(req, res) {
        const payload = req.body;
        if (!payload)
            return res.status(500).json();
        try {
            const create = await createService_1._CreateUserService.handleExecute(payload, payload.NameStore);
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
        var _a, _b;
        const { Username, Password } = req.body;
        if (!Username || !Password)
            return res.status(404).json({ message: 'Usuario/Senha em branco!' });
        try {
            const validateAuth = await authUserService_1._AuthUser.handleExecute({ Username, Password });
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 1);
            if ((0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).status === 403 || (0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).status === 404 || (0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).status === 401)
                return res.status((0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).status).json({ message: (0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).message, returnCode: validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num });
            res.cookie('_xc0d3_t0k3n', (0, authUserTokenGenerate_1.AuthTokenGenerate)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.obj), {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 3600000,
                expires: expirationDate,
            });
            const accountDetails = await findByIdUser_1._FindUserById.handleExecute((_a = validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.obj) === null || _a === void 0 ? void 0 : _a.Id);
            if (accountDetails) {
                return res.status(200).json({ message: (0, checkTypeResponse_1.checkTypeResponse)(validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num).message, data: `${(_b = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.Stores[0]) === null || _b === void 0 ? void 0 : _b.Name}`, returnCode: validateAuth === null || validateAuth === void 0 ? void 0 : validateAuth.num });
            }
        }
        catch ({ error }) {
            return res.status(500).json({
                Message: (error === null || error === void 0 ? void 0 : error.message) || 'Erro desconhecido',
                Data: new Date(),
                Error: error
            });
        }
    }
    async FindUserAuthOnly(req, res) {
        //realiazr aqui os requestes já vou pegar logo é tudo!!
        const idUser = req.User.Id;
        const accountDetails = await findByIdUser_1._FindUserById.handleExecute(idUser);
        if (accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.Stores) {
            const guestUsers = await FindAllUserByStore_1._FindAllUserByStore.handleExecute(Number(accountDetails.Stores[0].Id));
            if (guestUsers) {
                return res.status(200).json({ accountDetails, guestUsers });
            }
        }
    }
    async CreateUserAddStore(req, res) {
        const payload = req.body;
        const idUser = req.User.Id;
        try {
            const accountDetails = await findByIdUser_1._FindUserById.handleExecute(idUser);
            if (accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.Stores) {
                const createUser = await createUserService_1._CreateUserServiceAdd.handleExecute(payload, Number(accountDetails.Stores[0].Id));
                if (createUser) {
                    return res.status(200).json({ message: "usuario cadastrado com sucesso", createUser });
                }
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: e });
        }
    }
}
exports.default = UserController;
