import Express, { Application } from "express";
import { _StoreRoute } from "./routers/store_route";
import { NotFound } from "./midlwares/notfound";
import Cors from "cors";
import { _UserRouter } from "./routers/user_route";
export default class App {
  public app: Application;

  constructor() {
    this.app = Express();
    this.Middleware();
    this.Route();
  }

  private Middleware = () => {
    this.app.use(Cors());
    this.app.use(Express.json());
    this.app.use(Express.urlencoded({ extended: true, limit: 2500 }));
  };

  private Route = () => {
    this.app.use('/store', _StoreRoute);
    this.app.use('/user', _UserRouter);
    this.app.use("*", NotFound);
  };
}
