"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._CartFindItemService = void 0;
const cartItemRepository_1 = require("../../repository/cart/cartItemRepository");
class CartFindItemService {
    constructor(CartItemRepository) {
        this.CartItemRepository = CartItemRepository;
    }
    async Execute(Id, Name) {
        const FindAll = await this.CartItemRepository.ListId(Id, Name);
        return FindAll !== null && FindAll !== void 0 ? FindAll : null;
    }
}
exports._CartFindItemService = new CartFindItemService(new cartItemRepository_1.CartItemRepository());
