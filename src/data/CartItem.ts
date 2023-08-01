import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";

interface ICartItem {
  Id_Product?: number;
  TableId?: number;
}

export class CartItem extends Model<ICartItem> {}

CartItem.init({}, { sequelize: _DbContext, modelName: "CartItem" });
