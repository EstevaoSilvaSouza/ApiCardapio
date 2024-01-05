import { Model, DataTypes } from "sequelize";
import { _DbContext } from "./dbContext";
import { IProduct } from "./product";
import { User } from "./user";
import { UsuarioStore } from "./userStore";

export interface IStore {
  Id?: number;
  Name: string;
  Type: string;
  ImageUrl: string;
  Description: string;
  IdUser?:number;
  Products?: IProduct[];
}

export default class Store extends Model<IStore> {
  declare Name: string;
  declare Type: string;
  declare Description: string;
  declare ImageUrl: string;
}

Store.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: _DbContext,
    tableName: "Store",
  }
);
