import App from "./app/app";
import { CartItem } from "./data/CartItem";
import Table from "./data/Table";

import { _DbContext } from "./data/dbContext";
import { ProductsOrder } from "./data/productsOrder";
import Store from "./data/store";
import { User } from "./data/user";

const StartApplication = async () => {
  await _DbContext.authenticate().then(async () => {
    console.log(`banco conectado!`);
    //User.sync({force:true});
    //await ProductsOrder.sync({ alter: true });
  });

  new App().app.listen(3080, () => {
    console.log(`
        Servidor online teste!


        Url Base API : http://localhost:3080/store
    `);
  });
};

StartApplication();
