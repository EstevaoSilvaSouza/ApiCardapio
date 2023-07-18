import { IRouter, Request, Response, Router } from "express";
import StoreController from "../controllers/store/store_controller";

class StoreRoute extends StoreController {
  public Router!: IRouter;

  constructor() {
    super();
    this.Router = Router();
    //Rotas abaixo!!
    this.FindByStoreName();
  }

  private FindByStoreName = () => {
    this.Router.post("/find", this.Find);
  };
}

export const _StoreRoute = new StoreRoute().Router;
