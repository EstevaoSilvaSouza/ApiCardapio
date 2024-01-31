import { Op } from "sequelize";
import { IOrder, Order } from '../../data/order';
import { CartAbsRepository, IGetAllCount, IResponseListAllOrders } from "./ICartRepository";
import { IProductsOrder, ProductsOrder } from "../../data/productsOrder";
import Product from "../../data/product";

export class CartItemRepository extends CartAbsRepository {
  async GetAllCount(id:number,name:string): Promise<IGetAllCount | null> {

    const [TotalPedidos, PFinalizados,TotalProdutos] = await Promise.all([
      Order.count({where:{NameCart:name}}),
      Order.count({where:{NameCart:name, StatusOrder:'Finalizado'}}),
      Product.count({where:{Id_Store:id}})
    ])

    return {
      TotalPedidoMes:PFinalizados,
      TotalPedidos:TotalPedidos,
      TotalPedidosAno:PFinalizados,
      TotalPedidosDia:PFinalizados,
      TotalProdutos:TotalProdutos,
      ValorVendaDia:PFinalizados
    }
  }

  async FindAllOrder(status:string,nameStore: string, qtdItens: number, page: number): Promise<IResponseListAllOrders | null> {
    const offset = (page - 1) * qtdItens;

    const { count, rows } = await Order.findAndCountAll({
      where: {
        NameCart: nameStore,
        Status: { [Op.not]: false },
        StatusOrder: status
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
  
    return { Data: rows, QtdItens: count, TotalPagina: Math.round(count / qtdItens) };
  }
 async UpdateOrderStatus(payload:IOrder): Promise<[affectedCount: number] | null> {
  const {Id, StatusOrder} = payload;
    return await Order.update({StatusOrder},{where:{Id:Id}});
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
