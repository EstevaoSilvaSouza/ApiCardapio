"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findService_1 = require("../../../service/store/findService");
const findItemService_1 = require("../../../service/cart/findItemService");
const createService_1 = require("../../../service/store/createService");
const findStoreByUser_1 = require("../../../service/user/findStoreByUser");
const checkTypeResponse_1 = require("../../../types/checkTypeResponse");
const createProductService_1 = require("../../../service/store/createProductService");
const updateProductService_1 = require("../../../service/store/updateProductService");
class StoreController {
    constructor() {
        this.Find = async (req, res) => {
            const { Name, Type } = req.body;
            try {
                let StoreFind = await findService_1._FindService.Execute(Type, Name);
                if (StoreFind) {
                    const Filter = StoreFind.Products.map((e) => e.Type);
                    const Newmap = [...new Map(Filter.map((e) => [e, e])).values()];
                    return res.status(200).json({
                        Data: StoreFind,
                        Categoria: Newmap,
                    });
                }
                else {
                    return res.status(404).json({
                        Mensage: "Empresa não encontrada",
                    });
                }
            }
            catch (e) {
                res.status(500).json({
                    Mensage: "Erro de servidor, contate o administrador do sistema!",
                    Erro: e,
                });
            }
        };
        this.Teste = async (req, res) => {
            const { Id, Name } = req.body;
            try {
                const Find = await findItemService_1._CartFindItemService.Execute(Id, Name);
                if (Find) {
                    return res.status(200).json({
                        Data: Find,
                    });
                }
                else {
                    return res.status(200).json({
                        Mensagem: "Sem dado!",
                    });
                }
            }
            catch (Error) {
                return res.status(500).json({
                    Erro: Error,
                });
            }
        };
        this.Create = async (req, res) => {
            const payload = req.body;
            try {
                const create = await createService_1._CreateService.handleExecute(payload);
                if (!create)
                    return res.status(404).json({ Message: 'Falha ao criar usuario!', Date: new Date() });
                return res.status(200).json({ Message: 'Store criada com sucesso', Data: create });
            }
            catch (error) {
                return res.status(500).json({
                    Message: error.message,
                    Date: new Date()
                });
            }
        };
        this.FindStoreByUser = async (req, res) => {
            const { Name } = req.body;
            if (!Name)
                return res.status(400).json({ message: 'Prop Name Store invalida.' });
            try {
                let findStoreByUser = await findStoreByUser_1._FindStoreByUserService.handleExecute(req.User.Id, Name);
                if ((0, checkTypeResponse_1.checkTypeResponse)(findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id).status === 401)
                    return res.status((0, checkTypeResponse_1.checkTypeResponse)(findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id).status).json({
                        message: (0, checkTypeResponse_1.checkTypeResponse)(findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id).message, returnCode: findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id
                    });
                return res.status(200).json({ message: (0, checkTypeResponse_1.checkTypeResponse)(findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id).message, returnCode: findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id, Store: findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.obj });
            }
            catch (error) {
            }
        };
        this.CreateProduct = async (req, res) => {
            const { Name, Type, Value, Quantity, Description, Tag } = req.body;
            if (!Name || !Type || !Value || !Quantity || !Description
                || !Tag)
                return res.status(400).json({ message: 'Falha ao cadastrar produto, dado nulo' });
            try {
                const idUser = req.User.Id;
                const findStoreByUserId = await findStoreByUser_1._FindStoreByUserService.handleExecute(idUser, "store");
                if (findStoreByUserId === null || findStoreByUserId === void 0 ? void 0 : findStoreByUserId.obj) {
                    const { Id } = findStoreByUserId.obj;
                    const payload = { Name, Type, Value, Quantity, Description, Tag };
                    console.log(Id);
                    const addProduct = await createProductService_1._CreateProductService.handleExecute(payload, Id);
                    if (addProduct === null || addProduct === void 0 ? void 0 : addProduct.Id) {
                        return res.status(200).json({ message: 'Produto adicionado com sucesso' });
                    }
                    else {
                        return res.status(400).json({ message: 'Falha ao cadastrar produto!' });
                    }
                }
                else {
                    return res.status(400).json({ message: 'Falha ao encontrar Store' });
                }
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        };
        this.UpdateProduct = async (req, res) => {
            var _a, _b;
            try {
                const payload = req.body;
                const userId = req.User.Id;
                const storeId = (_b = (_a = req.User) === null || _a === void 0 ? void 0 : _a.Store) === null || _b === void 0 ? void 0 : _b.Id;
                const updateProduct = await updateProductService_1._UpdateProductService.handleExecute(payload, storeId, userId);
                return res.status(200).json({ message: 'foi ou nao', status: updateProduct, dataAlterada: payload });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        };
    }
}
exports.default = StoreController;
