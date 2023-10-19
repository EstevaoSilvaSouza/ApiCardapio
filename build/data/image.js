"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
const product_1 = __importDefault(require("./product"));
const order_1 = require("./order");
const productsOrder_1 = require("./productsOrder");
class Image extends sequelize_1.Model {
}
exports.Image = Image;
Image.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: dbContext_1._DbContext,
    tableName: "Image",
});
Image.belongsTo(product_1.default, {
    foreignKey: "Id_Product",
    constraints: true,
    foreignKeyConstraint: true,
});
product_1.default.hasMany(Image, {
    foreignKey: "Id_Product",
    constraints: true,
    foreignKeyConstraint: true,
});
order_1.Order.belongsToMany(productsOrder_1.ProductsOrder, {
    through: "CartItem",
    foreignKey: "Id_Order",
});
productsOrder_1.ProductsOrder.belongsToMany(order_1.Order, {
    through: "CartItem",
    foreignKey: "Id_Product",
});
