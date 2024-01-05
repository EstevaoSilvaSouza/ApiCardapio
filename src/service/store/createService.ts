import GenericData from "../../data/genericData";
import { IProduct } from "../../data/product";
import { IStore } from "../../data/store";
import { InterfaceStoryRepo } from "../../repository/store/IstoryRepository";
import StoreRepository from "../../repository/store/storeRepository";
import { StoreByUser } from "./findService";


class CreateService {
    constructor(private StoreRepo:InterfaceStoryRepo<IStore,IProduct, StoreByUser>){}

    handleExecute = async (payload:IStore): Promise<IStore | null> => {
        const createObj = new GenericData<IStore>(payload).returnData();
        createObj.Type = "Loja";
        
        const create = await this.StoreRepo.create(createObj);
        if(!create){
            throw ({message:'falha ao criar store'})
        }

        return create ? create : null;
    
    }

}

export const _CreateService = new CreateService(new StoreRepository());