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
    this.Con = new Sequelize(
      "postgres://default:K93MYgrwuLjv@ep-dawn-fire-87063438.us-east-1.postgres.vercel-storage.com:5432/verceldb",
      {
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true, // Requer conexão SSL
            rejectUnauthorized: false, // Ignora a verificação do certificado (não é recomendado para produção)
          },
        },
      },
    );
  };
}

export const _DbContext = new DbContext().Con;
