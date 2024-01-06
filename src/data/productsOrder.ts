import { DataTypes, Model, Sequelize } from "sequelize";
import { _DbContext } from "./dbContext";
import Store from "./store";
import { Order } from "./order";
import Product from "./product";
import { UUID } from "crypto";

export interface IProductsOrder {
  Id?: UUID;
  Name: string;
  Type: string;
  Value: number;
  Quantity: number;
  Description: string;
  Tag: string;
  Id_Store?:number;
  Id_Order?:number;
  Id_ProduRef?:number;
}

export class ProductsOrder extends Model<IProductsOrder> {
  declare Name: string;
  declare Type: string;
  declare Value: number;
  declare Quantity: number;
  declare Description: string;
  declare Tag: string;
  declare Id_Store:number;
  declare Id_Order:number;
  declare Id_ProduRef:number;
}

ProductsOrder.init(
  {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
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
    Id_Store:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    Id_Order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Id_ProduRef: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    }
  },
  {
    sequelize: _DbContext,
    tableName: "productOrder",
    freezeTableName: true,
  }
);

ProductsOrder.belongsTo(Store, {
  foreignKey: "Id_Store",
  constraints: true,
  foreignKeyConstraint: true,
});

Store.hasMany(ProductsOrder, {
  foreignKey: "Id_Store",
  constraints: true,
  foreignKeyConstraint: true,
});

ProductsOrder.belongsTo(Order,{
  foreignKey: "Id_Order",
  constraints: true,
  foreignKeyConstraint: true,
})

Order.hasMany(ProductsOrder, {
  foreignKey: "Id_Order",
  constraints: true,
  foreignKeyConstraint: true,
})

ProductsOrder.belongsTo(Product,{
  foreignKey: "Id_ProduRef",
  constraints: true,
  foreignKeyConstraint: true,
})

Product.hasMany(ProductsOrder,{
  foreignKey: "Id_ProduRef",
  constraints: true,
  foreignKeyConstraint: true,
})