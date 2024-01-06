"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const createOrderService_1 = require("../../../service/cart/createOrderService");
const findByIdOrder_1 = require("../../../service/cart/findByIdOrder");
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
    async FindOrder(req, res) {
        try {
            const { Id } = req.body;
            const findOrder = await findByIdOrder_1._FindOrderByIdService.Execute(Id);
            if (!findOrder)
                return res.status(401).json({ message: "Falha ao buscar Order" });
            return res.status(200).json({ message: "Order Encontrada", Pedido: findOrder });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}
exports.CartController = CartController;
