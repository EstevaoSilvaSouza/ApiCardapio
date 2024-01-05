"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._FindProductByIdService = void 0;
const storeRepository_1 = __importDefault(require("../../repository/store/storeRepository"));
class FindProductByIdService {
    constructor(StoreRepo) {
        this.StoreRepo = StoreRepo;
        this.handleExecute = async (idProduct, storeId, userId) => {
            const findProduct = await this.StoreRepo.findProuctById(idProduct);
            if (findProduct) {
                if (!findProduct || findProduct.Id_Store !== storeId)
                    throw ({ statusCode: 400, message: 'Sem permissão para Buscar Produto' });
            }
            else {
                throw ({ message: 'Produto não encontrado' });
            }
            if (!findProduct) {
                throw ({ message: 'Falha ao buscar produto' });
            }
            return findProduct ? findProduct : null;
        };
    }
}
exports._FindProductByIdService = new FindProductByIdService(new storeRepository_1.default());
