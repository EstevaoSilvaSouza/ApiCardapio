import App from "./app/app";

import { _DbContext } from "./data/dbContext";

const StartApplication = () => {
  _DbContext.sync({ force: true });

  new App().app.listen(3080, () => {
    console.log(`
        Servidor Rodando!!


        Url Base API : http://localhost:3080/store
    `);
  });
};

StartApplication();
