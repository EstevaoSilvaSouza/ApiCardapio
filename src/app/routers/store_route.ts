import { IRouter, Request, Response, Router } from "express";
import StoreController from "../controllers/store/store_controller";
import { AuthUser } from "../midlwares/auth.tokent";

class StoreRoute extends StoreController {
  public Router!: IRouter;

  constructor() {
    super();
    this.Router = Router();
    //Rotas abaixo!!
    this.FindByStoreName();
    this.RouteTest();
    this.CreateStore();
    this.FindByUserStore();
  }

  private FindByStoreName = () => this.Router.post("/find", this.Find);
  private RouteTest = () => this.Router.post("/teste",AuthUser, this.Teste);
  private CreateStore = () => this.Router.post('/new',this.Create);
  private FindByUserStore = () => this.Router.post('/currentuser/store',AuthUser, this.FindStoreByUser);
}

export const _StoreRoute = new StoreRoute().Router;
