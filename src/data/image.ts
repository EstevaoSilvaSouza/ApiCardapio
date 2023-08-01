import { Model, DataTypes, Sequelize } from "sequelize";
import { _DbContext } from "./dbContext";
import Product from "./product";
import Table from "./Table";
import { Order } from "./order";
import { ProductsOrder } from "./productsOrder";

export interface IImage {
  Id?: number;
  Name: string;
  Url: string;
}

export class Image extends Model<IImage> {
  declare Name: string;
  declare Url: string;
}

Image.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: _DbContext,
    tableName: "Image",
  }
);

Image.belongsTo(Product, {
  foreignKey: "Id_Product",
  constraints: true,
  foreignKeyConstraint: true,
});

Product.hasMany(Image, {
  foreignKey: "Id_Product",
  constraints: true,
  foreignKeyConstraint: true,
});

Order.belongsToMany(ProductsOrder, {
  through: "CartItem",
  foreignKey: "Id_Order",
});
ProductsOrder.belongsToMany(Order, {
  through: "CartItem",
  foreignKey: "Id_Product",
});
