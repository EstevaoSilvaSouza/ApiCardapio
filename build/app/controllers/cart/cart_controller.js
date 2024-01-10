"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const createOrderService_1 = require("../../../service/cart/createOrderService");
const findByIdOrder_1 = require("../../../service/cart/findByIdOrder");
const updateStatusOrder_1 = require("../../../service/cart/updateStatusOrder");
const findAllOrderStore_1 = require("../../../service/cart/findAllOrderStore");
class CartController {
    constructor() {
        this.UpdateStatusOrderStore = async (req, res) => {
            var _a, _b;
            try {
                const Payload = req.body;
                const NameStore = (_a = req.User) === null || _a === void 0 ? void 0 : _a.Stores[0].Name;
                const IdUser = (_b = req.User) === null || _b === void 0 ? void 0 : _b.Id;
                const updateProdutOrder = await updateStatusOrder_1._UpdateOrderStatus.handleExecute(Payload, NameStore, IdUser);
                if (!this.UpdateStatusOrderStore)
                    return res.status(400).json({ message: 'Falha ao atualizar produto' });
                return res.status(200).json({ message: 'Produto atualizado com sucesso', status: updateProdutOrder, data: Payload });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        };
        this.ListAllOrders = async (req, res) => {
            var _a;
            try {
                const nameStore = (_a = req.User) === null || _a === void 0 ? void 0 : _a.Stores[0].Name;
                const { QtdItensPage, Page } = req.params;
                const findAll = await findAllOrderStore_1._FindAllOrderStore.Execute(nameStore, Number(QtdItensPage), Number(Page));
                if (!findAll)
                    return res.status(400).json({ message: 'Falha ao encontrar as Orders' });
                return res.status(200).json({ message: 'Orders encontradas com sucesso', Orders: findAll });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        };
    }
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
            const { Id } = req.params;
            const findOrder = await findByIdOrder_1._FindOrderByIdService.Execute(Number(Id));
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
