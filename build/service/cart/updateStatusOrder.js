"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._UpdateOrderStatus = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const cartItemRepository_1 = require("../../repository/cart/cartItemRepository");
class UpdateOrderStatus {
    constructor(CartRepo) {
        this.CartRepo = CartRepo;
        this.handleExecute = async (payload, storeName, userId) => {
            const createObj = new genericData_1.default(payload).returnData();
            const findOrder = await this.CartRepo.FindByIdOrder(payload.Id);
            if (findOrder) {
                if (findOrder.NameCart !== storeName) {
                    throw ({ message: "acesso negado para realizar atualização no produto" });
                }
                if (findOrder.Id !== createObj.Id) {
                    throw ({ message: "acesso negado para realizar atualização no produto" });
                }
            }
            else {
                throw ({ message: 'Produto não encontrado' });
            }
            const update = await this.CartRepo.UpdateOrderStatus(createObj);
            if (!update) {
                throw ({ message: 'falha ao atualizar Produto' });
            }
            return update ? update : null;
        };
    }
}
exports._UpdateOrderStatus = new UpdateOrderStatus(new cartItemRepository_1.CartItemRepository());
