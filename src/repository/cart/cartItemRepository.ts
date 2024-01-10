import { Op } from "sequelize";
import { IOrder, Order } from '../../data/order';
import { CartAbsRepository, IResponseListAllOrders } from "./ICartRepository";
import { IProductsOrder, ProductsOrder } from "../../data/productsOrder";

export class CartItemRepository extends CartAbsRepository {
  async FindAllOrder(nameStore: string, qtdItens: number, page: number): Promise<IResponseListAllOrders | null> {
    const offset = (page - 1) * qtdItens;
    
    const { count, rows } = await Order.findAndCountAll({
      where: {
        NameCart: nameStore,
        Status: { [Op.not]: false },
      },
      limit: qtdItens,
      offset: offset,
      include: [
        {
          model: ProductsOrder,
          as: 'orderProducts',
        },
      ],
      order: [['createdAt', 'DESC']], // Ordena por 'createdAt' de forma decrescente (mais novo para mais antigo)
      distinct:true
    });
  
    return { Data: rows, QtdItens: rows.length, TotalPagina: Math.round(count / qtdItens) };
  }
 async UpdateOrderStatus(payload:IOrder): Promise<[affectedCount: number] | null> {
    return await Order.update(payload,{where:{Id:payload.Id}});
  }
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
