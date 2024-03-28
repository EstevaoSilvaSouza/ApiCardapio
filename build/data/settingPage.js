"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
const store_1 = __importDefault(require("./store"));
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
    },
    ColorButtonAddProductCart: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ColorFontCategory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ColorHeaderTitleCategory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ColorButtonCart: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ColorButtonHoverAddProductCart: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ColorFontHeader: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ColorFontHeaderCategory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ColorHoverButtonCategory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: dbContext_1._DbContext,
    tableName: 'SettingPage',
    freezeTableName: true
});
SettingPage.belongsTo(store_1.default, {
    foreignKey: 'Id_CustomSettingCss',
    constraints: true,
    foreignKeyConstraint: true,
});
store_1.default.hasOne(SettingPage, {
    foreignKey: 'Id_CustomSettingCss',
    constraints: true,
    foreignKeyConstraint: true
});
