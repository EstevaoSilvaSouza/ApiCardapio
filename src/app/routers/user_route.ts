import {  IRouter, Router } from "express";
import UserController from "../controllers/user/user_controller";
import { validateToken } from "../midlwares/validate.token";
import { AuthUser } from "../midlwares/auth.tokent";


class UserRouter extends UserController {
   public Router:IRouter ;
    constructor(){
        super()
        this.Router = Router();
        //Abaixo as rotas!!
        this.create();
        this.auth();
        this.validateToken();
    }

    create = () => this.Router.post('/create-user',this.NewUser); 
    auth = () => this.Router.post('/authenticate-user', this.AuthUser);
    validateToken = () => this.Router.post('/authenticate-validate' ,AuthUser,validateToken);
}

export const _UserRouter = new UserRouter().Router;