"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._StoreRoute = void 0;
const express_1 = require("express");
const store_controller_1 = __importDefault(require("../controllers/store/store_controller"));
class StoreRoute extends store_controller_1.default {
    constructor() {
        super();
        this.FindByStoreName = () => {
            this.Router.post("/find", this.Find);
        };
        this.Router = (0, express_1.Router)();
        //Rotas abaixo!!
        this.FindByStoreName();
    }
}
exports._StoreRoute = new StoreRoute().Router;
