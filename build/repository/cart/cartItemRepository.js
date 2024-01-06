"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemRepository = void 0;
const sequelize_1 = require("sequelize");
const order_1 = require("../../data/order");
const ICartRepository_1 = require("./ICartRepository");
const productsOrder_1 = require("../../data/productsOrder");
class CartItemRepository extends ICartRepository_1.CartAbsRepository {
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
