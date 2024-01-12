"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._StoreRoute = void 0;
const express_1 = require("express");
const store_controller_1 = __importDefault(require("../controllers/store/store_controller"));
const auth_httponly_1 = require("../midlwares/auth.httponly");
class StoreRoute extends store_controller_1.default {
    constructor() {
        super();
        this.FindByStoreName = () => this.Router.post("/find", this.Find);
        this.RouteTest = () => this.Router.get("/teste", this.Teste);
        this.CreateStore = () => this.Router.post('/new', this.Create);
        this.FindByUserStore = () => this.Router.post('/currentuser/store', auth_httponly_1.AuhHttpOnly, this.FindStoreByUser);
        this.CreateProductStore = () => this.Router.post('/currentstore/newProduct', auth_httponly_1.AuhHttpOnly, this.CreateProduct);
        this.UpdateProductStore = () => this.Router.post('/currentstore/updateProduct', auth_httponly_1.AuhHttpOnly, this.UpdateProduct);
        this.FindProductByIdStore = () => this.Router.post('/currentstore/findProduct', auth_httponly_1.AuhHttpOnly, this.FindProductById);
        this.Router = (0, express_1.Router)();
        //Rotas abaixo!!
        this.FindByStoreName();
        this.RouteTest();
        this.CreateStore();
        this.FindByUserStore();
        this.CreateProductStore();
        this.UpdateProductStore();
        this.FindProductByIdStore();
    }
}
exports._StoreRoute = new StoreRoute().Router;
