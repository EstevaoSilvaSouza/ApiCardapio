import {  IRouter, Router } from "express";
import UserController from "../controllers/user/user_controller";


class UserRouter extends UserController {
   public Router:IRouter ;
    constructor(){
        super()
        this.Router = Router();
        //Abaixo as rotas!!
        this.create();
        this.auth();
    }

    create = () => this.Router.post('/create-user',this.NewUser); 
    auth = () => this.Router.post('/authenticate-user', this.AuthUser);
}

export const _UserRouter = new UserRouter().Router;