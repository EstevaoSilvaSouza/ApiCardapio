import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";
import Store from "./store";
import Product from "./product";

export interface ITable {
  Id?: number;
  Name?: string;
  Description?: string;
  Status?: boolean;
  Password?: string;
}

export default class Table extends Model<ITable> {
  declare Name?: string;
  declare Description?: string;
  declare Status?: boolean;
  declare Password?: string;
}

Table.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: _DbContext,
    tableName: "Table",
  }
);

Table.belongsTo(Store, {
  foreignKey: "Id_Store",
  foreignKeyConstraint: true,
  constraints: true,
});

Store.hasMany(Table, {
  foreignKey: "Id_Store",
  foreignKeyConstraint: true,
  constraints: true,
});
