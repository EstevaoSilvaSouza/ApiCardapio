import GenericData from "../../data/genericData";
import { IOrder } from "../../data/order";
import { IStore } from "../../data/store";
import { ICartRepository } from "../../repository/cart/ICartRepository";
import { CartItemRepository } from "../../repository/cart/cartItemRepository";
import { _FindService } from "../store/findService";
import { _CreateProductOrderService } from "./createProductOrderService";
import crypto from 'crypto';
class CreateOrderService {
    constructor(private s:ICartRepository<any>){}

    Execute = async (payload:IOrder) : Promise<IOrder | null> => {
        const OrderObj : IOrder = new GenericData<IOrder>(payload).returnData();
        const createOrder = await this.s.Create(OrderObj);

        if(!createOrder){ throw({message:'Falha interna ao criar Order'})}
        const getIdStore =  await _FindService.Execute('default',payload.NameCart) as IStore;
        if(getIdStore.Id){
            if(OrderObj.Items?.length! >= 1){
                const newObj = OrderObj.Items?.map((e) => {
                    //e.Id = crypto.randomUUID();
                    e.Id_Order = createOrder.Id;
                    e.Value = getIdStore.Products?.find((a) => a.Id == e.Id_ProduRef )?.Value! || e.Value;
                    e.Id_Store = getIdStore.Id;
                    return e;
                })
                newObj?.map(async (e) => {
                    await _CreateProductOrderService.Execute(e).catch((e) => {throw({message:e})})
                })
            }
        }
      
    
        return createOrder ? createOrder : null;
    }
}

export const _CreateOrderService = new CreateOrderService(new CartItemRepository());