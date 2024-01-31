import { IOrder } from "../../data/order";
import { ICartRepository, IResponseListAllOrders } from "../../repository/cart/ICartRepository";
import { CartItemRepository } from "../../repository/cart/cartItemRepository";

class FindAllOrderStore {
  constructor(private CartItemRepository: ICartRepository<any>) {}

  async Execute(status:string,nameStore:string,qtdItens:number,pagina:number): Promise<IResponseListAllOrders | null> {

    const findOrder = await this.CartItemRepository.FindAllOrder(status,nameStore,qtdItens,pagina);
    if(!findOrder){
        throw({message:'Falha em processar as Orders'})
    }
    return findOrder ?? null;
  }
}

export const _FindAllOrderStore = new FindAllOrderStore(
  new CartItemRepository()
);
