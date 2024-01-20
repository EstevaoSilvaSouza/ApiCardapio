"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._FindAllCountService = void 0;
const cartItemRepository_1 = require("../../repository/cart/cartItemRepository");
class FindAllCountService {
    constructor(s) {
        this.s = s;
        this.handleExecute = async (id, name) => {
            const findALl = await this.s.GetAllCount(id, name);
            if (!findALl)
                throw ({ message: 'Falha ao processar contagem inicial' });
            return findALl !== null && findALl !== void 0 ? findALl : findALl;
        };
    }
}
exports._FindAllCountService = new FindAllCountService(new cartItemRepository_1.CartItemRepository());
