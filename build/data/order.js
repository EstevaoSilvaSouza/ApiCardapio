"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
const Table_1 = __importDefault(require("./Table"));
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    NameCart: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    StatusOrder: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    buyerName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'sem cart',
    },
    buyerPhone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'sem number'
    }
}, {
    sequelize: dbContext_1._DbContext,
    tableName: "Order",
    freezeTableName: true,
});
Order.belongsTo(Table_1.default, {
    foreignKey: "Id_Table",
    constraints: true,
    foreignKeyConstraint: true,
});
Table_1.default.hasMany(Order, {
    foreignKey: "Id_Table",
    constraints: true,
    foreignKeyConstraint: true,
});
