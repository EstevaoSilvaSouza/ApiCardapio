"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DbContext = void 0;
const sequelize_1 = require("sequelize");
class DbContext {
    constructor() {
        this.Connect = () => {
            /*this.Con = new Sequelize("railway", "root", "fTfEMGxYG3mMW4fzoIvW", {
              dialect: "mysql",
              host: "containers-us-west-124.railway.app",
              port: 6298,
              logging: true,
            });*/
            this.Con = new sequelize_1.Sequelize("postgres://default:K93MYgrwuLjv@ep-dawn-fire-87063438.us-east-1.postgres.vercel-storage.com:5432/verceldb", {
                dialect: "postgres",
                logging: false,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false, // Ignora a verificação do certificado (não é recomendado para produção)
                    },
                },
            });
        };
        this.Connect();
    }
}
exports._DbContext = new DbContext().Con;
