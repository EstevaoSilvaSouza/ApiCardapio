import { ICartRepository } from "../../repository/cart/ICartRepository";
import { CartItemRepository } from "../../repository/cart/cartItemRepository";

class DeleteOrderService {
    constructor(private e:ICartRepository<any>){}

    handleExecute = async (id:number): Promise<any> => {
        return await this.e.DeleteOrder(id)
    }
}

export const _DeleteOrderService = new DeleteOrderService(new CartItemRepository());