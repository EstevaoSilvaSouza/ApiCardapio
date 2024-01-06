import { Op } from "sequelize";
import { CartItem } from "../../data/CartItem";
import Table from "../../data/Table";
import { IOrder, Order } from "../../data/order";
import Product from "../../data/product";
import { CartAbsRepository } from "./ICartRepository";
import { IProductsOrder, ProductsOrder } from "../../data/productsOrder";

export class CartItemRepository extends CartAbsRepository {
  async FindByIdOrder(idOrder: number): Promise<IOrder | null> {
    return await Order.findByPk(idOrder,{
      include:[
        {model:ProductsOrder, as:"orderProducts"}
      ]
    });
  }
  
  async CreateProductOrder(payload: IProductsOrder[]): Promise<IProductsOrder[] | null> {
    return await ProductsOrder.bulkCreate(payload);
  }
  async Create(p:IOrder): Promise<IOrder | null> {
    return await Order.create(p);
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
