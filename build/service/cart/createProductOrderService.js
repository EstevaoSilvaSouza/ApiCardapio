"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateProductOrderService = void 0;
const cartItemRepository_1 = require("../../repository/cart/cartItemRepository");
class CreateProductOrderService {
    constructor(s) {
        this.s = s;
        this.Execute = async (payload) => {
            //const OrderObj : IProductsOrder = new GenericData<IProductsOrder>(payload).returnData();
            const createProductOrder = await this.s.CreateProductOrder(payload);
            if (!createProductOrder) {
                throw ({ message: 'Falha interna ao cadastrar Produto Cart' });
            }
            return createProductOrder ? createProductOrder : null;
        };
    }
}
exports._CreateProductOrderService = new CreateProductOrderService(new cartItemRepository_1.CartItemRepository());
