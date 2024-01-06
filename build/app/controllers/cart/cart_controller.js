"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const createOrderService_1 = require("../../../service/cart/createOrderService");
class CartController {
    async Create(req, res) {
        try {
            const payload = req.body;
            console.log(payload);
            const createOrder = await createOrderService_1._CreateOrderService.Execute(payload);
            if (!createOrder)
                return res.status(401).json({ message: 'Falha ao criar Order' });
            return res.status(200).json({ message: 'Order Criada com sucesso', Order: createOrder.Id, Itens: createOrder.Items });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}
exports.CartController = CartController;
