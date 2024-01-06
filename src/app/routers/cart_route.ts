import { IRouter, Router } from "express";
import { CartController } from "../controllers/cart/cart_controller";

class CartRoute extends CartController{

    public Router!:IRouter;

    constructor(){
        super();
        this.Router = Router();
        //rotas logo abaixo!
        this.CreateOrder();
        this.FindOrderById();
    }
      
    CreateOrder = () => this.Router.post('/store/newOrder',this.Create);
    FindOrderById = () => this.Router.post('/store/findOrder', this.FindOrder);
}

export const _CartRoute = new CartRoute().Router;