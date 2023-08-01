import { ICartRepository } from "../../repository/cart/ICartRepository";
import { CartItemRepository } from "../../repository/cart/cartItemRepository";

class CartFindItemService {
  constructor(private CartItemRepository: ICartRepository<any>) {}

  async Execute(Id: number, Name: string): Promise<any[] | null> {
    const FindAll = await this.CartItemRepository.ListId(Id, Name);

    return FindAll ?? null;
  }
}

export const _CartFindItemService = new CartFindItemService(
  new CartItemRepository()
);
