"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const dbContext_1 = require("./data/dbContext");
const StartApplication = async () => {
    await dbContext_1._DbContext.authenticate().then(async () => {
        console.log(`banco conectado!`);
        //_DbContext.sync();
        //await Order.sync({force:true});
    });
    new app_1.default().app.listen(3080, () => {
        console.log(`
        Servidor online teste!


        Url Base API : http://localhost:3080/store
    `);
    });
};
StartApplication();
