import App from "./app/app";
import socketInit from "./app/socket/socket";
import { _DbContext } from "./data/dbContext";

import Http from 'http'
import LogAudit from "./data/logaudit";
import SettingPage from "./data/settingPage";

const app = new App().app;
const server = Http.createServer(app);
socketInit.initialize(server)
  server.listen(3080, () => {
    //SettingPage.sync({force:true});
    console.log(`
        Servidor online teste!


        Url Base API : http://localhost:3080/store
    `);
  });
