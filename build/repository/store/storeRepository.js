"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = require("../../data/image");
const product_1 = __importDefault(require("../../data/product"));
const store_1 = __importDefault(require("../../data/store"));
class StoreRepository {
    async find(storeName) {
        return await store_1.default.findOne({
            where: { Name: storeName },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
                model: product_1.default,
                include: [
                    { model: image_1.Image, attributes: { exclude: ["createdAt", "updatedAt"] } },
                ],
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },
        });
    }
    async findAll() {
        return await store_1.default.findAll({ raw: true });
    }
}
exports.default = StoreRepository;
