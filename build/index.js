"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const StartApplication = () => {
    new app_1.default().app.listen(3080, () => {
        console.log(`
        Servidor Rodando!!


        Url Base API : http://localhost:3080/store
    `);
    });
};
StartApplication();
