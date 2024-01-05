import { IRouter, Request, Response, Router } from "express";
import StoreController from "../controllers/store/store_controller";
import { AuthUser } from "../midlwares/auth.tokent";
import { AuhHttpOnly } from "../midlwares/auth.httponly";

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
    this.CreateProductStore();
    this.UpdateProductStore();
    this.FindProductByIdStore();
  }

  private FindByStoreName = () => this.Router.post("/find", this.Find);
  private RouteTest = () => this.Router.post("/teste",AuthUser, this.Teste);
  private CreateStore = () => this.Router.post('/new',this.Create);
  private FindByUserStore = () => this.Router.post('/currentuser/store',AuhHttpOnly, this.FindStoreByUser);
  private CreateProductStore = () => this.Router.post('/currentstore/newProduct',AuhHttpOnly, this.CreateProduct);
  private UpdateProductStore = () => this.Router.post('/currentstore/updateProduct',AuhHttpOnly, this.UpdateProduct);
  private FindProductByIdStore = () => this.Router.post('/currentstore/findProduct',AuhHttpOnly, this.FindProductById);
}

export const _StoreRoute = new StoreRoute().Router;
