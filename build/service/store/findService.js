"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._FindService = void 0;
const storeRepository_1 = __importDefault(require("../../repository/store/storeRepository"));
class FindService {
    constructor(StoreRepository) {
        this.StoreRepository = StoreRepository;
    }
    async Execute(type, name) {
        let StoreResult = null;
        if (type === "one") {
            StoreResult = await this.StoreRepository.find(name);
        }
        else if (type === "all") {
            StoreResult = await this.StoreRepository.findAll();
        }
        else {
            StoreResult = null;
        }
        return StoreResult !== null && StoreResult !== void 0 ? StoreResult : null;
    }
}
exports._FindService = new FindService(new storeRepository_1.default());
