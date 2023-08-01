import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";
import Store from "./store";

export interface IProductsOrder {
  Id?: number;
  Name: string;
  Type: string;
  Value: number;
  Quantity: number;
  Description: string;
  Tag: string;
}

export class ProductsOrder extends Model<IProductsOrder> {
  declare Name: string;
  declare Type: string;
  declare Value: number;
  declare Quantity: number;
  declare Description: string;
  declare Tag: string;
}

ProductsOrder.init(
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
