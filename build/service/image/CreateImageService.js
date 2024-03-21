"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateImageService = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const IimageRepository_1 = require("../../repository/image/IimageRepository");
const imageRepository_1 = __importDefault(require("../../repository/image/imageRepository"));
class CreateImageService {
    constructor(e) {
        this.e = e;
        this.KeyBase = 'a60cb78d2cefb917e4416a082c7113a6';
        this.UrlBase = `https://api.imgbb.com/1/upload`;
        this.fetchImage = async (b64) => {
            const formData = new FormData();
            formData.append('key', this.KeyBase);
            formData.append('image', b64);
            const data = await fetch(this.UrlBase, {
                method: 'post',
                body: formData,
            });
            const dataResult = await data.json();
            return dataResult;
        };
        this.handleCreateImageServer = async (img) => {
            const sendImageServer = await this.fetchImage(img);
            console.log(sendImageServer);
            return sendImageServer;
        };
        this.handleExecute = async (base64, idItem, status) => {
            let createImageServerIIMGBb = null;
            console.log("dev");
            if (status === IimageRepository_1.StatusRequest.Image) {
                return null;
            }
            else if (status === IimageRepository_1.StatusRequest.Product) {
                const imgUrl = await this.handleCreateImageServer(base64);
                const img = new genericData_1.default({ Name: 'Image Product', Url: imgUrl === null || imgUrl === void 0 ? void 0 : imgUrl.data.url, Id_Product: idItem }).returnData();
                createImageServerIIMGBb = await this.e.create(img);
            }
            else {
                return null;
            }
            return createImageServerIIMGBb && createImageServerIIMGBb;
        };
    }
}
exports._CreateImageService = new CreateImageService(new imageRepository_1.default());
