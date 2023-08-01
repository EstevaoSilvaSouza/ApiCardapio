import { Op } from "sequelize";
import { CartItem } from "../../data/CartItem";
import Table from "../../data/Table";
import { Order } from "../../data/order";
import Product from "../../data/product";
import { CartAbsRepository } from "./ICartRepository";
import { ProductsOrder } from "../../data/productsOrder";

export class CartItemRepository extends CartAbsRepository {
  Create(): Promise<boolean | null> {
    throw new Error("Method not implemented.");
  }
  async ListId(IdTable: number, CartName: string): Promise<any[] | null> {
    //"ok";
    try {
      const cartItems = await Order.findAll({
        where: {
          NameCart: CartName,
          Id_Table: IdTable,
          Status: {
            [Op.ne]: false,
          },
        },
        include: {
          model: ProductsOrder,
          where: { Id_Store: 1 },
          through: { attributes: [] },
        },
      });

      return cartItems;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
