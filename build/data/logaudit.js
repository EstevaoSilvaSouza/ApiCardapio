"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
class LogAudit extends sequelize_1.Model {
}
exports.default = LogAudit;
LogAudit.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    ApiPath: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: false
    },
    Body: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: false
    },
    Ip: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: false
    },
    Method: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: false
    },
    Type: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: false
    },
}, {
    sequelize: dbContext_1._DbContext,
    freezeTableName: true,
    tableName: 'LogAudit'
});
