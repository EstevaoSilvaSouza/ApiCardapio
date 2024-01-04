import GenericData from "../../data/genericData";
import { IProduct } from '../../data/product';
import { IStore } from "../../data/store";
import { InterfaceStoryRepo } from "../../repository/store/IstoryRepository";
import StoreRepository from "../../repository/store/storeRepository";
import { _FindService } from "./findService";


class UpdateProductService {
    constructor(private StoreRepo:InterfaceStoryRepo<IStore,IProduct>){}

    handleExecute = async (payload:IProduct,storeId:number,userId:number): Promise<[affectedCount: number] | null> => {
        const createObj = new GenericData<IProduct>(payload).returnData();


        const CheckUserStore:IStore | IStore[] | null = await _FindService.Execute('UserAuth','name',userId,1010)

       if(CheckUserStore) {
        let store = CheckUserStore as IStore;
        let findItem = store.Products?.find((e) => e.Id === payload.Id);
        if(!findItem || findItem.Id_Store !== storeId || findItem.Id_Store !== payload.Id_Store) throw ({message:'Produto não encontrado na Store'});
       }
       else{
        throw ({message:'Store não encontrada'})
       }

        const update = await this.StoreRepo.updateProduct(createObj);
        if(!update){
            throw ({message:'falha ao criar produto'})
        }

        return update ? update : null;
    }

}

export const _UpdateProductService = new UpdateProductService(new StoreRepository());