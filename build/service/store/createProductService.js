"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateProductService = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const storeRepository_1 = __importDefault(require("../../repository/store/storeRepository"));
class CreateProductService {
    constructor(StoreRepo) {
        this.StoreRepo = StoreRepo;
        this.handleExecute = async (payload, storeId) => {
            const createObj = new genericData_1.default(payload).returnData();
            const create = await this.StoreRepo.createProduct(Object.assign(Object.assign({}, createObj), { Id_Store: storeId }));
            if (!create) {
                throw ({ message: 'falha ao criar produto' });
            }
            return create ? create : null;
        };
    }
}
exports._CreateProductService = new CreateProductService(new storeRepository_1.default());
