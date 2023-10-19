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
    this.CreateStore();
  }

  private FindByStoreName = () => this.Router.post("/find", this.Find);
  private RouteTest = () => this.Router.post("/teste", this.Teste);
  private CreateStore = () => this.Router.post('/new',this.Create);
}

export const _StoreRoute = new StoreRoute().Router;
