"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
class SettingPage extends sequelize_1.Model {
}
exports.default = SettingPage;
SettingPage.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    ColorBackground: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ColorButtonCategory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ColorButtonInputCart: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    FontPage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: dbContext_1._DbContext,
    tableName: 'SettingPage',
    freezeTableName: true
});
