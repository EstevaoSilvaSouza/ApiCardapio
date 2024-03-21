import {  IRouter, Request, Response, Router } from "express";
import UserController from "../controllers/user/user_controller";
import { validateToken } from "../midlwares/validate.token";
import { AuthUser } from "../midlwares/auth.tokent";
import { AuhHttpOnly } from "../midlwares/auth.httponly";
import { CheckPermission } from "../midlwares/auth.checkPermission";
import { _CreateImageService } from "../../service/image/CreateImageService";


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
        this.getUserDetails();
        this.createUserAddStoreChange();
        //this.testDev();
    }

    create = () => this.Router.post('/create-user',this.NewUser); 
    teste = () => this.Router.get('/test',(req:Request,res:Response) => {
        res.send('ok');
    }); 
    auth = () => this.Router.post('/authenticate-user', this.AuthUser);
    validateToken = () => this.Router.get('/authenticate-validate' ,AuhHttpOnly,validateToken);
    getUserDetails = () => this.Router.get('/get-userdetails', AuhHttpOnly,CheckPermission(['Root','SuperAdmin','Admin']),this.FindUserAuthOnly);
    createUserAddStoreChange  = () => this.Router.post('/create-userstore', AuhHttpOnly,CheckPermission(['Root','SuperAdmin','Admin']),this.CreateUserAddStore);
    //testDev = () => {this.Router.get('/devtest',_CreateImageService.handleExecute)}
}

export const _UserRouter = new UserRouter().Router;