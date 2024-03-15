"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user/user_controller"));
const validate_token_1 = require("../midlwares/validate.token");
const auth_httponly_1 = require("../midlwares/auth.httponly");
const auth_checkPermission_1 = require("../midlwares/auth.checkPermission");
class UserRouter extends user_controller_1.default {
    constructor() {
        super();
        this.create = () => this.Router.post('/create-user', this.NewUser);
        this.teste = () => this.Router.get('/test', auth_httponly_1.AuhHttpOnly, (req, res) => {
            res.send('ok');
        });
        this.auth = () => this.Router.post('/authenticate-user', this.AuthUser);
        this.validateToken = () => this.Router.get('/authenticate-validate', auth_httponly_1.AuhHttpOnly, validate_token_1.validateToken);
        this.getUserDetails = () => this.Router.get('/get-userdetails', auth_httponly_1.AuhHttpOnly, (0, auth_checkPermission_1.CheckPermission)(['Root', 'SuperAdmin', 'Admin']), this.FindUserAuthOnly);
        this.createUserAddStoreChange = () => this.Router.post('/create-userstore', auth_httponly_1.AuhHttpOnly, (0, auth_checkPermission_1.CheckPermission)(['Root', 'SuperAdmin', 'Admin']), this.CreateUserAddStore);
        this.Router = (0, express_1.Router)();
        //Abaixo as rotas!!
        this.create();
        this.teste();
        this.auth();
        this.validateToken();
        this.getUserDetails();
        this.createUserAddStoreChange();
    }
}
exports._UserRouter = new UserRouter().Router;
