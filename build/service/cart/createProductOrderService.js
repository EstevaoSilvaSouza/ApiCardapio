"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateProductOrderService = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const cartItemRepository_1 = require("../../repository/cart/cartItemRepository");
class CreateProductOrderService {
    constructor(s) {
        this.s = s;
        this.Execute = async (payload) => {
            const OrderObj = new genericData_1.default(payload).returnData();
            const createProductOrder = await this.s.CreateProductOrder(OrderObj);
            if (!createProductOrder) {
                throw ({ message: 'Falha interna ao cadastrar Produto Cart' });
            }
            return createProductOrder ? createProductOrder : null;
        };
    }
}
exports._CreateProductOrderService = new CreateProductOrderService(new cartItemRepository_1.CartItemRepository());
