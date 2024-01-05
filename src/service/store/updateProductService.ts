import GenericData from "../../data/genericData";
import { IProduct } from '../../data/product';
import { IStore } from "../../data/store";
import { InterfaceStoryRepo } from "../../repository/store/IstoryRepository";
import StoreRepository from "../../repository/store/storeRepository";
import { StoreByUser, _FindService } from "./findService";


class UpdateProductService {
    constructor(private StoreRepo:InterfaceStoryRepo<IStore,IProduct, StoreByUser>){}

    handleExecute = async (payload:IProduct,storeId:number,userId:number): Promise<[affectedCount: number] | null> => {
        const createObj = new GenericData<IProduct>(payload).returnData();


        const CheckUserStore:IStore | IStore[] | StoreByUser | null = await _FindService.Execute('UserAuth','name',userId,1010)

       if(CheckUserStore) {
        let store = CheckUserStore as StoreByUser;
        let findItem = store.Stores[0].Products?.find((e) => e.Id === payload.Id);
        if(!findItem) throw ({message:'Produto não encontrado na Store'})
        else if( findItem.Id_Store !== storeId || findItem.Id_Store !== payload.Id_Store)throw ({message:'Sem permissão para editar Produto'})
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