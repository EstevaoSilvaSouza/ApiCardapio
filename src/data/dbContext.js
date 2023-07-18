"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DbContext = void 0;
const sequelize_1 = require("sequelize");
class DbContext {
    constructor() {
        this.Connect = () => {
            this.Con = new sequelize_1.Sequelize("railway", "root", "fTfEMGxYG3mMW4fzoIvW", {
                dialect: "mysql",
                host: "containers-us-west-124.railway.app",
                port: 6298,
                logging: true,
            });
        };
        this.Connect();
    }
}
exports._DbContext = new DbContext().Con;
