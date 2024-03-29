"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findService_1 = require("../../../service/store/findService");
const createService_1 = require("../../../service/store/createService");
const findStoreByUser_1 = require("../../../service/user/findStoreByUser");
const checkTypeResponse_1 = require("../../../types/checkTypeResponse");
const createProductService_1 = require("../../../service/store/createProductService");
const updateProductService_1 = require("../../../service/store/updateProductService");
const findProductByIdService_1 = require("../../../service/store/findProductByIdService");
const findAllCountService_1 = require("../../../service/store/findAllCountService");
const CreateImageService_1 = require("../../../service/image/CreateImageService");
const updateService_1 = require("../../../service/settingPage/updateService");
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
            return res.status(200).json({ message: "Rota valida teste" });
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
            var _a;
            const { Name } = req.body;
            if (!Name)
                return res.status(400).json({ message: 'Prop Name Store invalida.' });
            try {
                let findStoreByUser = await findStoreByUser_1._FindStoreByUserService.handleExecute(req.User.Id, Name);
                if ((0, checkTypeResponse_1.checkTypeResponse)(findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id).status === 401)
                    return res.status((0, checkTypeResponse_1.checkTypeResponse)(findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id).status).json({
                        message: (0, checkTypeResponse_1.checkTypeResponse)(findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id).message, returnCode: findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id
                    });
                return res.status(200).json({ message: (0, checkTypeResponse_1.checkTypeResponse)(findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id).message, returnCode: findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.id, Store: (_a = findStoreByUser === null || findStoreByUser === void 0 ? void 0 : findStoreByUser.obj) === null || _a === void 0 ? void 0 : _a.Stores[0] });
            }
            catch (error) {
            }
        };
        this.CreateProduct = async (req, res) => {
            var _a, _b;
            const { Name, Type, Value, Quantity, Description, Tag, Base64 } = req.body;
            if (!Name || !Type || !Value || !Quantity || !Description || !Base64
                || !Tag)
                return res.status(400).json({ message: 'Falha ao cadastrar produto, dado nulo' });
            try {
                const idUser = req.User.Id;
                const findStoreByUserId = await findStoreByUser_1._FindStoreByUserService.handleExecute(idUser, "store");
                if (findStoreByUserId === null || findStoreByUserId === void 0 ? void 0 : findStoreByUserId.obj) {
                    const idStore = (_b = (_a = findStoreByUserId.obj) === null || _a === void 0 ? void 0 : _a.Stores[0]) === null || _b === void 0 ? void 0 : _b.Id;
                    const payload = { Name, Type, Value, Quantity, Description, Tag };
                    const addProduct = await createProductService_1._CreateProductService.handleExecute(payload, idStore);
                    if (addProduct === null || addProduct === void 0 ? void 0 : addProduct.Id) {
                        const t = await CreateImageService_1._CreateImageService.handleExecute(Base64, addProduct.Id, 'Product');
                        console.log(t);
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
                const storeId = (_b = (_a = req.User) === null || _a === void 0 ? void 0 : _a.Stores[0]) === null || _b === void 0 ? void 0 : _b.Id;
                const updateProduct = await updateProductService_1._UpdateProductService.handleExecute(payload, storeId, userId);
                return res.status(200).json({ message: 'Produto Atualizado com sucesso', status: updateProduct, dataAlterada: payload });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        };
        this.UpdateColorCustomPage = async (req, res) => {
            const body = req.body;
            try {
                const idStore = req.User.Stores[0].Id;
                const update = await updateService_1._UpdateServiceSettingPage.handleExecute(body, idStore);
                if (update && update[0] > 0)
                    return res.status(200).json(update);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.FindProductById = async (req, res) => {
            var _a, _b;
            try {
                const { Id } = req.body;
                if (typeof (Id) !== 'number') {
                    return res.status(400).json({ message: 'Id invalido' });
                }
                ;
                const userId = req.User.Id;
                const storeId = (_b = (_a = req.User) === null || _a === void 0 ? void 0 : _a.Stores[0]) === null || _b === void 0 ? void 0 : _b.Id;
                const findProduct = await findProductByIdService_1._FindProductByIdService.handleExecute(Id, storeId, userId);
                if (!findProduct)
                    return res.status(400).json({ message: 'Falha ao encontrar produto' });
                return res.status(200).json({ message: 'Busca realizada com sucesso', produto: findProduct });
            }
            catch (error) {
                return res.status((error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({ message: error === null || error === void 0 ? void 0 : error.message });
            }
        };
        this.GetAllCount = async (req, res) => {
            var _a, _b, _c;
            try {
                const NameStore = (_a = req.User) === null || _a === void 0 ? void 0 : _a.Stores[0].Name;
                const storeId = (_c = (_b = req.User) === null || _b === void 0 ? void 0 : _b.Stores[0]) === null || _c === void 0 ? void 0 : _c.Id;
                const findCount = await findAllCountService_1._FindAllCountService.handleExecute(storeId, NameStore);
                if (!findCount)
                    return res.status(400).json({ message: 'Nenhum dado para ser processado' });
                return res.status(200).json(findCount);
            }
            catch (error) {
                return res.status((error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({ message: error === null || error === void 0 ? void 0 : error.message });
            }
        };
    }
}
exports.default = StoreController;
