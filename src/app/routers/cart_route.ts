import { IRouter, Router } from "express";
import { CartController } from "../controllers/cart/cart_controller";
import { AuhHttpOnly } from "../midlwares/auth.httponly";

class CartRoute extends CartController{

    public Router!:IRouter;

    constructor(){
        super();
        this.Router = Router();
        //rotas logo abaixo!
        this.CreateOrder();
        this.FindOrderById();
        this.UpdateOrderProduct(); 
        this.FindAllOrders();
    }
      
    CreateOrder = () => this.Router.post('/store/newOrder',this.Create);
    FindOrderById = () => this.Router.get('/store/findOrder/:Id', this.FindOrder);
    UpdateOrderProduct = () => this.Router.put('/store/orderUpdate',AuhHttpOnly,this.UpdateStatusOrderStore);
    FindAllOrders = () => this.Router.get('/store/listOrders/:QtdItensPage/:Page',AuhHttpOnly,this.ListAllOrders);
}

export const _CartRoute = new CartRoute().Router;