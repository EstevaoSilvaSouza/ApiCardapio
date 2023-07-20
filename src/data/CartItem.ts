import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";

interface ICartItem {
  Id_Product?: number;
  Id_Table?: number;
  NameCart?: string;
  Status?: boolean;
}

export class CartItem extends Model<ICartItem> {}

CartItem.init(
  {
    Id_Product: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Id_Table: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    NameCart: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize: _DbContext, modelName: "CartItem" }
);
