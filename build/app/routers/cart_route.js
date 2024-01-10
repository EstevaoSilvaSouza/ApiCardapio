"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._CartRoute = void 0;
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart/cart_controller");
const auth_httponly_1 = require("../midlwares/auth.httponly");
class CartRoute extends cart_controller_1.CartController {
    constructor() {
        super();
        this.CreateOrder = () => this.Router.post('/store/newOrder', this.Create);
        this.FindOrderById = () => this.Router.get('/store/findOrder/:Id', this.FindOrder);
        this.UpdateOrderProduct = () => this.Router.put('/store/orderUpdate', auth_httponly_1.AuhHttpOnly, this.UpdateStatusOrderStore);
        this.FindAllOrders = () => this.Router.get('/store/listOrders/:QtdItensPage/:Page', auth_httponly_1.AuhHttpOnly, this.ListAllOrders);
        this.Router = (0, express_1.Router)();
        //rotas logo abaixo!
        this.CreateOrder();
        this.FindOrderById();
        this.UpdateOrderProduct();
        this.FindAllOrders();
    }
}
exports._CartRoute = new CartRoute().Router;
