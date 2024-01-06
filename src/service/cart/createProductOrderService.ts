import GenericData from "../../data/genericData";
import { IOrder } from "../../data/order";
import { IProduct } from "../../data/product";
import { IProductsOrder } from "../../data/productsOrder";
import { ICartRepository } from "../../repository/cart/ICartRepository";
import { CartItemRepository } from "../../repository/cart/cartItemRepository";

class CreateProductOrderService {
    constructor(private s:ICartRepository<any>){}

    Execute = async (payload:IProductsOrder) : Promise<IProductsOrder | null> => {
        const OrderObj : IProductsOrder = new GenericData<IProductsOrder>(payload).returnData();

        const createProductOrder = await this.s.CreateProductOrder(OrderObj);

        if(!createProductOrder){ throw({message:'Falha interna ao cadastrar Produto Cart'})}

        return createProductOrder ? createProductOrder : null;
    }
}

export const _CreateProductOrderService = new CreateProductOrderService(new CartItemRepository());