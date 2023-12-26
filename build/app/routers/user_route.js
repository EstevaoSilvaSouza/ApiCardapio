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
class UserRouter extends user_controller_1.default {
    constructor() {
        super();
        this.create = () => this.Router.post('/create-user', this.NewUser);
        this.teste = () => this.Router.get('/test', auth_httponly_1.AuhHttpOnly, (req, res) => {
            res.send('ok');
        });
        this.auth = () => this.Router.post('/authenticate-user', this.AuthUser);
        this.validateToken = () => this.Router.get('/authenticate-validate', auth_httponly_1.AuhHttpOnly, validate_token_1.validateToken);
        this.Router = (0, express_1.Router)();
        //Abaixo as rotas!!
        this.create();
        this.teste();
        this.auth();
        this.validateToken();
    }
}
exports._UserRouter = new UserRouter().Router;
