"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsOrder = void 0;
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
const store_1 = __importDefault(require("./store"));
class ProductsOrder extends sequelize_1.Model {
}
exports.ProductsOrder = ProductsOrder;
ProductsOrder.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Tag: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Value: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    sequelize: dbContext_1._DbContext,
    tableName: "productOrder",
    freezeTableName: true,
});
ProductsOrder.belongsTo(store_1.default, {
    foreignKey: "Id_Store",
    constraints: true,
    foreignKeyConstraint: true,
});
store_1.default.hasMany(ProductsOrder, {
    foreignKey: "Id_Store",
    constraints: true,
    foreignKeyConstraint: true,
});
