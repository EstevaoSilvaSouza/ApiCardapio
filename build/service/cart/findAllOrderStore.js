"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._FindAllOrderStore = void 0;
const cartItemRepository_1 = require("../../repository/cart/cartItemRepository");
class FindAllOrderStore {
    constructor(CartItemRepository) {
        this.CartItemRepository = CartItemRepository;
    }
    async Execute(nameStore, qtdItens, pagina) {
        const findOrder = await this.CartItemRepository.FindAllOrder(nameStore, qtdItens, pagina);
        if (!findOrder) {
            throw ({ message: 'Falha em processar as Orders' });
        }
        return findOrder !== null && findOrder !== void 0 ? findOrder : null;
    }
}
exports._FindAllOrderStore = new FindAllOrderStore(new cartItemRepository_1.CartItemRepository());
