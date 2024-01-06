"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._FindOrderByIdService = void 0;
const cartItemRepository_1 = require("../../repository/cart/cartItemRepository");
class FindOrderByIdService {
    constructor(CartItemRepository) {
        this.CartItemRepository = CartItemRepository;
    }
    async Execute(Id) {
        const findOrder = await this.CartItemRepository.FindByIdOrder(Id);
        if (!findOrder) {
            throw ({ message: 'Loja não encontrada' });
        }
        return findOrder !== null && findOrder !== void 0 ? findOrder : null;
    }
}
exports._FindOrderByIdService = new FindOrderByIdService(new cartItemRepository_1.CartItemRepository());
