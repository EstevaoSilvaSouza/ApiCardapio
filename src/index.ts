import App from "./app/app";
import { CartItem } from "./data/CartItem";
import Table from "./data/Table";

import { _DbContext } from "./data/dbContext";
import { Order } from "./data/order";
import Product from "./data/product";
import { ProductsOrder } from "./data/productsOrder";
import Store from "./data/store";
import { User } from "./data/user";




const StartApplication = async () => {
  await _DbContext.authenticate().then(async () => {
    console.log(`banco conectado!`);
    //_DbContext.sync();
    //await Order.sync({force:true});
  });

  new App().app.listen(3080, () => {
    console.log(`
        Servidor online teste!


        Url Base API : http://localhost:3080/store
    `);
  });
};

StartApplication();
