import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";
import Table from "./Table";
import Product, { IProduct } from "./product";
import { IProductsOrder } from "./productsOrder";

export interface IOrder {
  Id?: number;
  NameCart?: string;
  Status?: boolean;
  StatusOrder?:string;
  Items?:IProductsOrder[];
  Id_Table?: number;
  createdAt?:Date | string;
  buyerName?:string;
  buyerPhone?:string;
}

export class Order extends Model<IOrder> {
  declare NameCart?: string;
  declare Status?: boolean;
  declare StatusOrder?: string;
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
    StatusOrder: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    buyerName:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:'sem cart',
      
    },
    buyerPhone:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:'sem number'
    }
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
