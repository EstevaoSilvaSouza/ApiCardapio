"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemRepository = void 0;
const sequelize_1 = require("sequelize");
const order_1 = require("../../data/order");
const ICartRepository_1 = require("./ICartRepository");
const productsOrder_1 = require("../../data/productsOrder");
const product_1 = __importDefault(require("../../data/product"));
class CartItemRepository extends ICartRepository_1.CartAbsRepository {
    async GetAllCount(id, name) {
        const [TotalPedidos, PFinalizados, TotalProdutos] = await Promise.all([
            order_1.Order.count({ where: { NameCart: name } }),
            order_1.Order.count({ where: { NameCart: name, StatusOrder: 'Finalizado' } }),
            product_1.default.count({ where: { Id_Store: id } })
        ]);
        return {
            TotalPedidoMes: PFinalizados,
            TotalPedidos: TotalPedidos,
            TotalPedidosAno: PFinalizados,
            TotalPedidosDia: PFinalizados,
            TotalProdutos: TotalProdutos,
            ValorVendaDia: PFinalizados
        };
    }
    async FindAllOrder(nameStore, qtdItens, page) {
        const offset = (page - 1) * qtdItens;
        const { count, rows } = await order_1.Order.findAndCountAll({
            where: {
                NameCart: nameStore,
                Status: { [sequelize_1.Op.not]: false },
            },
            limit: qtdItens,
            offset: offset,
            include: [
                {
                    model: productsOrder_1.ProductsOrder,
                    as: 'orderProducts',
                },
            ],
            order: [['createdAt', 'DESC']],
            distinct: true
        });
        return { Data: rows, QtdItens: count, TotalPagina: Math.round(count / qtdItens) };
    }
    async UpdateOrderStatus(payload) {
        const { Id, StatusOrder } = payload;
        return await order_1.Order.update({ StatusOrder }, { where: { Id: Id } });
    }
    async FindByIdOrder(idOrder) {
        return await order_1.Order.findByPk(idOrder, {
            include: [
                { model: productsOrder_1.ProductsOrder, as: "orderProducts" }
            ]
        });
    }
    async CreateProductOrder(payload) {
        return await productsOrder_1.ProductsOrder.bulkCreate(payload);
    }
    async Create(p) {
        return await order_1.Order.create(p);
    }
    async ListId(IdTable, CartName) {
        //"ok";
        try {
            const cartItems = await order_1.Order.findAll({
                where: {
                    NameCart: CartName,
                    Id_Table: IdTable,
                    Status: {
                        [sequelize_1.Op.ne]: false,
                    },
                },
                include: {
                    model: productsOrder_1.ProductsOrder,
                    where: { Id_Store: 1 },
                    through: { attributes: [] },
                },
            });
            return cartItems;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
exports.CartItemRepository = CartItemRepository;
