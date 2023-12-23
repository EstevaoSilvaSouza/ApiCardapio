"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
const user_1 = require("./user");
class Store extends sequelize_1.Model {
}
exports.default = Store;
Store.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ImageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: dbContext_1._DbContext,
    tableName: "Store",
});
Store.belongsTo(user_1.User, {
    foreignKey: 'IdUser',
    constraints: true,
    foreignKeyConstraint: true
});
user_1.User.hasOne(Store, {
    foreignKey: 'IdUser',
    constraints: true,
    foreignKeyConstraint: true
});
