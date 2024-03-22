"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_route_1 = require("./routers/store_route");
const notfound_1 = require("./midlwares/notfound");
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./routers/user_route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cart_route_1 = require("./routers/cart_route");
class App {
    constructor() {
        this.Middleware = () => {
            this.app.use((0, cors_1.default)({
                origin: 'https://cardapio-web-pearl.vercel.app',
                credentials: true,
            }));
            this.app.use((0, cookie_parser_1.default)());
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
            this.app.options('*', (0, cors_1.default)());
        };
        this.Route = () => {
            this.app.use('/store', store_route_1._StoreRoute);
            this.app.use('/user', user_route_1._UserRouter);
            this.app.use('/cart', cart_route_1._CartRoute);
            this.app.use("*", notfound_1.NotFound);
        };
        this.app = (0, express_1.default)();
        this.Middleware();
        this.Route();
    }
}
exports.default = App;
