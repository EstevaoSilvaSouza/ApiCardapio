import GenericData from "../../data/genericData";
import { IProduct } from "../../data/product";
import { IStore } from "../../data/store";
import { InterfaceStoryRepo } from "../../repository/store/IstoryRepository";
import StoreRepository from "../../repository/store/storeRepository";


class CreateProductService {
    constructor(private StoreRepo:InterfaceStoryRepo<IStore,IProduct>){}

    handleExecute = async (payload:IProduct,storeId:number): Promise<IProduct | null> => {
        const createObj = new GenericData<IProduct>(payload).returnData();
        const create = await this.StoreRepo.createProduct({...createObj,Id_Store:storeId});
        if(!create){
            throw ({message:'falha ao criar produto'})
        }

        return create ? create : null;
    }

}

export const _CreateProductService = new CreateProductService(new StoreRepository());