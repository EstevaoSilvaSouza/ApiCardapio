"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._UpdateProductService = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const storeRepository_1 = __importDefault(require("../../repository/store/storeRepository"));
const findService_1 = require("./findService");
class UpdateProductService {
    constructor(StoreRepo) {
        this.StoreRepo = StoreRepo;
        this.handleExecute = async (payload, storeId, userId) => {
            var _a;
            const createObj = new genericData_1.default(payload).returnData();
            const CheckUserStore = await findService_1._FindService.Execute('UserAuth', 'name', userId, 1010);
            if (CheckUserStore) {
                let store = CheckUserStore;
                let findItem = (_a = store.Products) === null || _a === void 0 ? void 0 : _a.find((e) => e.Id === payload.Id);
                if (!findItem || findItem.Id_Store !== storeId || findItem.Id_Store !== payload.Id_Store)
                    throw ({ message: 'Produto não encontrado na Store' });
            }
            else {
                throw ({ message: 'Store não encontrada' });
            }
            const update = await this.StoreRepo.updateProduct(createObj);
            if (!update) {
                throw ({ message: 'falha ao criar produto' });
            }
            return update ? update : null;
        };
    }
}
exports._UpdateProductService = new UpdateProductService(new storeRepository_1.default());
