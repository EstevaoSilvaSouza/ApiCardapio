import App from "./app/app";
import { CartItem } from "./data/CartItem";
import Table from "./data/Table";

import { _DbContext } from "./data/dbContext";
import { ProductsOrder } from "./data/productsOrder";

const StartApplication = async () => {
  await _DbContext.authenticate().then(async () => {
    console.log(`banco conectado!`);

    //await ProductsOrder.sync({ alter: true });
  });

  new App().app.listen(3080, () => {
    console.log(`
        Servidor Rodando!!


        Url Base API : http://localhost:3080/store
    `);
  });
};

StartApplication();
