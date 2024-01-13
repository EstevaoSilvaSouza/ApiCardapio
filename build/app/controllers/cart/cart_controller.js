"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const createOrderService_1 = require("../../../service/cart/createOrderService");
const findByIdOrder_1 = require("../../../service/cart/findByIdOrder");
const updateStatusOrder_1 = require("../../../service/cart/updateStatusOrder");
const findAllOrderStore_1 = require("../../../service/cart/findAllOrderStore");
const socket_1 = __importStar(require("../../socket/socket"));
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
                if (socket_1.ArrayOrderTime.get(Payload.Id)) {
                    socket_1.default.sendOrderStatus(socket_1.ArrayOrderTime.get(Payload.Id), Payload.StatusOrder, Payload.Id);
                }
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
            const createOrder = await createOrderService_1._CreateOrderService.Execute(payload);
            if (!createOrder)
                return res.status(401).json({ message: 'Falha ao criar Order' });
            if (socket_1.ArrayOrderTime.has(payload.NameCart)) {
                socket_1.default.sendNewOrder(socket_1.ArrayOrderTime.get(payload.NameCart), createOrder);
            }
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
