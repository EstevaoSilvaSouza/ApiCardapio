"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = require("../../data/image");
const IimageRepository_1 = __importDefault(require("./IimageRepository"));
class ImageRepository extends IimageRepository_1.default {
    constructor() {
        super(...arguments);
        this.create = async (payload) => {
            return await image_1.Image.create(payload);
        };
        this.update = async (payload) => {
            return await image_1.Image.create(payload);
        };
        this.delete = async (id) => {
            return null;
        };
    }
}
exports.default = ImageRepository;
