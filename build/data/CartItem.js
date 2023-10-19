"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
class CartItem extends sequelize_1.Model {
}
exports.CartItem = CartItem;
CartItem.init({}, { sequelize: dbContext_1._DbContext, modelName: "CartItem" });
