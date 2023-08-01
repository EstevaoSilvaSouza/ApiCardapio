import { IRouter, Request, Response, Router } from "express";
import StoreController from "../controllers/store/store_controller";

class StoreRoute extends StoreController {
  public Router!: IRouter;

  constructor() {
    super();
    this.Router = Router();
    //Rotas abaixo!!
    this.FindByStoreName();
    this.RouteTest();
  }

  private FindByStoreName = () => {
    this.Router.post("/find", this.Find);
  };

  private RouteTest = () => {
    this.Router.post("/teste", this.Teste);
  };
}

export const _StoreRoute = new StoreRoute().Router;
