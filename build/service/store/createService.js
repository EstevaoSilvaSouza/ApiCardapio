"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateService = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const storeRepository_1 = __importDefault(require("../../repository/store/storeRepository"));
class CreateService {
    constructor(StoreRepo) {
        this.StoreRepo = StoreRepo;
        this.handleExecute = async (payload) => {
            const createObj = new genericData_1.default(payload).returnData();
            const create = await this.StoreRepo.create(createObj);
            if (!create) {
                throw ({ message: 'falha ao criar store' });
            }
            return create ? create : null;
        };
    }
}
exports._CreateService = new CreateService(new storeRepository_1.default());
