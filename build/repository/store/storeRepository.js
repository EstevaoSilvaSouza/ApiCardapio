"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = require("../../data/image");
const product_1 = __importDefault(require("../../data/product"));
const store_1 = __importDefault(require("../../data/store"));
const user_1 = require("../../data/user");
class StoreRepository {
    async findProuctById(Id) {
        return await product_1.default.findByPk(Id);
    }
    async updateProduct(payload) {
        return await product_1.default.update(payload, { where: { Id: payload.Id } });
    }
    deleteProduct(payload) {
        throw new Error("Method not implemented.");
    }
    async createProduct(p) {
        return await product_1.default.create(p);
    }
    async create(payload) {
        return await store_1.default.create(payload);
    }
    async find(storeName, type, idUser) {
        if (type === 'default') {
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
        else {
            const t = await user_1.User.findOne({
                where: { Id: idUser },
                attributes: { exclude: ["createdAt", "updatedAt", "FullName", "Email", "IsActive", "Password", "Type", "Username", "Name"] },
                include: [
                    {
                        model: store_1.default,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [{
                                model: product_1.default,
                                include: [{ model: image_1.Image, attributes: { exclude: ["createdAt", "updatedAt"] }, }]
                            }]
                    },
                ],
            });
            return t;
        }
    }
    async findAll() {
        return await store_1.default.findAll({ raw: true });
    }
}
exports.default = StoreRepository;
