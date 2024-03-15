import { Server } from "socket.io";
import App from "./app/app";
import socketInit from "./app/socket/socket";
import SocketServer from "./app/socket/socket";
import { CartItem } from "./data/CartItem";
import Table from "./data/Table";

import { _DbContext } from "./data/dbContext";
import { Order } from "./data/order";
import Product from "./data/product";
import { ProductsOrder } from "./data/productsOrder";
import Store from "./data/store";
import { User } from "./data/user";
import Http from 'http'

const app = new App().app;
const server = Http.createServer(app);
socketInit.initialize(server)
  server.listen(3080, () => {
    //User.sync({alter:true})
    console.log(`
        Servidor online teste!


        Url Base API : http://localhost:3080/store
    `);
  });
