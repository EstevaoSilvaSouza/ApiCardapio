import GenericData from "../../data/genericData";
import { IStore } from "../../data/store";
import { InterfaceStoryRepo } from "../../repository/store/IstoryRepository";
import StoreRepository from "../../repository/store/storeRepository";


class CreateService {
    constructor(private StoreRepo:InterfaceStoryRepo<IStore>){}

    handleExecute = async (payload:IStore): Promise<IStore | null> => {
        const createObj = new GenericData<IStore>(payload).returnData();
        const create = await this.StoreRepo.create(createObj);
        if(!create){
            throw ({message:'falha ao criar store'})
        }

        return create
    
    }

}

export const _CreateService = new CreateService(new StoreRepository());