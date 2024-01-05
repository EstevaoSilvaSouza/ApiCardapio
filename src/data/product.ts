import { Model, DataTypes } from "sequelize";
import { _DbContext } from "./dbContext";
import Store from "./store";

import Table from "./Table";

export interface IProduct {
  Id?: number;
  Name: string;
  Type: string;
  Value: number;
  Quantity: number;
  Description: string;
  Tag: string;
  Id_Store?:number;
}

export default class Product extends Model<IProduct> {
  declare Name: string;
  declare Type: string;
  declare Value: number;
  declare Quantity: number;
  declare Description: string;
  declare Tag: string;
}

Product.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Value: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize: _DbContext,
    tableName: "product",
    freezeTableName: true,
  }
);

Product.belongsTo(Store, {
  foreignKey: "Id_Store",
  constraints: true,
  foreignKeyConstraint: true,
});

Store.hasMany(Product, {
  foreignKey: "Id_Store",
  constraints: true,
  foreignKeyConstraint: true,
});

