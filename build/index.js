"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const socket_1 = __importDefault(require("./app/socket/socket"));
const http_1 = __importDefault(require("http"));
const app = new app_1.default().app;
const server = http_1.default.createServer(app);
socket_1.default.initialize(server);
server.listen(3080, () => {
    //LogAudit.sync({force:true});
    console.log(`
        Servidor online teste!


        Url Base API : http://localhost:3080/store
    `);
});
