"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    Execute(type, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let StoreResult = null;
            if (type === "one") {
                StoreResult = yield this.StoreRepository.find(name);
            }
            else if (type === "all") {
                StoreResult = yield this.StoreRepository.findAll();
            }
            else {
                StoreResult = null;
            }
            return StoreResult !== null && StoreResult !== void 0 ? StoreResult : null;
        });
    }
}
exports._FindService = new FindService(new storeRepository_1.default());
