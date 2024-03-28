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
    this.CountAllDatas();
    this.updateCustomColorStore();
  }

  private FindByStoreName = () => this.Router.post("/find", this.Find);
  private RouteTest = () => this.Router.get("/teste", this.Teste);
  private CreateStore = () => this.Router.post('/new',this.Create);
  private FindByUserStore = () => this.Router.post('/currentuser/store',AuhHttpOnly, this.FindStoreByUser);
  private CreateProductStore = () => this.Router.post('/currentstore/newProduct',AuhHttpOnly, this.CreateProduct);
  private UpdateProductStore = () => this.Router.post('/currentstore/updateProduct',AuhHttpOnly, this.UpdateProduct);
  private FindProductByIdStore = () => this.Router.post('/currentstore/findProduct',AuhHttpOnly, this.FindProductById);
  private CountAllDatas = () => this.Router.get('/currentstore/getallStatus', AuhHttpOnly, this.GetAllCount);
  private updateCustomColorStore = () => this.Router.post('/currentStore/updateCustomColorStore', AuhHttpOnly, this.UpdateColorCustomPage);
}

export const _StoreRoute = new StoreRoute().Router;
