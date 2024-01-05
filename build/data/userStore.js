"use strict";
// userStore.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioStore = void 0;
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
class UsuarioStore extends sequelize_1.Model {
}
exports.UsuarioStore = UsuarioStore;
UsuarioStore.init({
    Id_Usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    Id_Store: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize: dbContext_1._DbContext,
    tableName: "UsuarioStore",
    freezeTableName: true,
});
