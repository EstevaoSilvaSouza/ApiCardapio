import {  IRouter, Request, Response, Router } from "express";
import UserController from "../controllers/user/user_controller";
import { validateToken } from "../midlwares/validate.token";
import { AuthUser } from "../midlwares/auth.tokent";
import { AuhHttpOnly } from "../midlwares/auth.httponly";


class UserRouter extends UserController {
   public Router:IRouter ;
    constructor(){
        super()
        this.Router = Router();
        //Abaixo as rotas!!
        this.create();
        this.teste();
        this.auth();
        this.validateToken();
    }

    create = () => this.Router.post('/create-user',this.NewUser); 
    teste = () => this.Router.get('/test',AuhHttpOnly,(req:Request,res:Response) => {
        res.send('ok');
    }); 
    auth = () => this.Router.post('/authenticate-user', this.AuthUser);
    validateToken = () => this.Router.get('/authenticate-validate' ,AuhHttpOnly,validateToken);
}

export const _UserRouter = new UserRouter().Router;