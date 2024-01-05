// userStore.ts

import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";

import Store from "./store";
import { User } from "./user";

export interface IUserStore {
    Id_Usuario: number;
    Id_Store: number;
}

export class UsuarioStore extends Model<IUserStore> {
  declare Id_Usuario: number;
  declare Id_Store: number;
}

UsuarioStore.init(
    {
      Id_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Id_Store: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize: _DbContext,
      tableName: "UsuarioStore",
      freezeTableName: true,
    }
  );

