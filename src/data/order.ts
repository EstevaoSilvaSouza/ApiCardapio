import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";
import Table from "./Table";
import Product from "./product";

export interface IOrder {
  Id?: number;
  NameCart?: string;
  Status?: boolean;
  Id_Table?: number;
}

export class Order extends Model<IOrder> {
  declare NameCart?: string;
  declare Status?: boolean;
}

Order.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    NameCart: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: _DbContext,
    tableName: "Order",
    freezeTableName: true,
  }
);

Order.belongsTo(Table, {
  foreignKey: "Id_Table",
  constraints: true,
  foreignKeyConstraint: true,
});

Table.hasMany(Order, {
  foreignKey: "Id_Table",
  constraints: true,
  foreignKeyConstraint: true,
});