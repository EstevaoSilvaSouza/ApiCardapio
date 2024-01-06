"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._CartRoute = void 0;
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart/cart_controller");
class CartRoute extends cart_controller_1.CartController {
    constructor() {
        super();
        this.CreateOrder = () => this.Router.post('/store/newOrder', this.Create);
        this.Router = (0, express_1.Router)();
        //rotas logo abaixo!
        this.CreateOrder();
    }
}
exports._CartRoute = new CartRoute().Router;
