import Express, { Application } from "express";
import { _StoreRoute } from "./routers/store_route";
import { NotFound } from "./midlwares/notfound";
import Cors from "cors";
import { _UserRouter } from "./routers/user_route";
import cookieParser from 'cookie-parser';
import { _CartRoute } from "./routers/cart_route";

export default class App {
  public app: Application;

  constructor() {
    this.app = Express();
    this.Middleware();
    this.Route();
  }

  private Middleware = () => {
    this.app.use(
      Cors({
        origin: 'https://cardapio-web-pearl.vercel.app',
        credentials: true,
      })
    );
    
    this.app.use(cookieParser());
    this.app.use(Express.json({limit:'50mb'}));
    this.app.use(Express.urlencoded({ extended: true, limit:'50mb' }));
    this.app.options('*', Cors());
  };

  private Route = () => {
    this.app.use('/store', _StoreRoute);
    this.app.use('/user', _UserRouter);
    this.app.use('/cart',_CartRoute);
    this.app.use("*", NotFound);
  };
}
