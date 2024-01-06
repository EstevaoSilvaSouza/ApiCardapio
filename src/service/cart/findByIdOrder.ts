import { IOrder } from "../../data/order";
import { ICartRepository } from "../../repository/cart/ICartRepository";
import { CartItemRepository } from "../../repository/cart/cartItemRepository";

class FindOrderByIdService {
  constructor(private CartItemRepository: ICartRepository<any>) {}

  async Execute(Id: number): Promise<IOrder | null> {
    const findOrder = await this.CartItemRepository.FindByIdOrder(Id);
    if(!findOrder){
        throw({message:'Loja não encontrada'})
    }
    return findOrder ?? null;
  }
}

export const _FindOrderByIdService = new FindOrderByIdService(
  new CartItemRepository()
);
