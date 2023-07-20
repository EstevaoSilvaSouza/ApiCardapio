import { Sequelize } from "sequelize";

class DbContext {
  public Con!: Sequelize;

  constructor() {
    this.Connect();
  }

  private Connect = (): void => {
    /*this.Con = new Sequelize("railway", "root", "fTfEMGxYG3mMW4fzoIvW", {
      dialect: "mysql",
      host: "containers-us-west-124.railway.app",
      port: 6298,
      logging: true,
    });*/
    this.Con = new Sequelize("AStore", "root", "Tilindo@14", {
      dialect: "mysql",
      host: "localhost",
      logging: true,
    });
  };
}

export const _DbContext = new DbContext().Con;
