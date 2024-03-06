"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DeleteOrderService = void 0;
const cartItemRepository_1 = require("../../repository/cart/cartItemRepository");
class DeleteOrderService {
    constructor(e) {
        this.e = e;
        this.handleExecute = async (id) => {
            return await this.e.DeleteOrder(id);
        };
    }
}
exports._DeleteOrderService = new DeleteOrderService(new cartItemRepository_1.CartItemRepository());
