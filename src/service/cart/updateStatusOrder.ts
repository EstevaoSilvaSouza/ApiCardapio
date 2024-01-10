import GenericData from "../../data/genericData";
import { IOrder } from "../../data/order";
import { IProduct } from '../../data/product';
import { IStore } from "../../data/store";
import { ICartRepository } from "../../repository/cart/ICartRepository";
import { CartItemRepository } from "../../repository/cart/cartItemRepository";

import { InterfaceStoryRepo } from "../../repository/store/IstoryRepository";
import StoreRepository from "../../repository/store/storeRepository";

class UpdateOrderStatus {
    constructor(private CartRepo:ICartRepository<any>){}

    handleExecute = async (payload:IOrder,storeName:string,userId:number): Promise<[affectedCount: number] | null> => {
        const createObj = new GenericData<IOrder>(payload).returnData();
        const findOrder = await this.CartRepo.FindByIdOrder(payload.Id!);
        
       if(findOrder) {
        if(findOrder.NameCart !== storeName){ throw ({message:"acesso negado para realizar atualização no produto"})}
        if(findOrder.Id !== createObj.Id){ throw ({message:"acesso negado para realizar atualização no produto"})}
       }
       else{
        throw ({message:'Produto não encontrado'})
       }

        const update = await this.CartRepo.UpdateOrderStatus(createObj);
        if(!update){
            throw ({message:'falha ao atualizar Produto'})
        }

        return update ? update : null;
    }

}

export const _UpdateOrderStatus = new UpdateOrderStatus(new CartItemRepository());