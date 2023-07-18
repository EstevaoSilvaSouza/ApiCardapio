import App from "./app/app";
import { Image } from "./data/image";
import Store from "./data/store";

const StartApplication = () => {
  new App().app.listen(3080, () => {
    console.log(`
        Servidor Rodando!!


        Url Base API : http://localhost:3080/store
    `);
  });
};

StartApplication();
