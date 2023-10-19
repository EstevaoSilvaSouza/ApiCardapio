"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
const store_1 = __importDefault(require("./store"));
class Table extends sequelize_1.Model {
}
exports.default = Table;
Table.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: dbContext_1._DbContext,
    tableName: "Table",
});
Table.belongsTo(store_1.default, {
    foreignKey: "Id_Store",
    foreignKeyConstraint: true,
    constraints: true,
});
store_1.default.hasMany(Table, {
    foreignKey: "Id_Store",
    foreignKeyConstraint: true,
    constraints: true,
});
