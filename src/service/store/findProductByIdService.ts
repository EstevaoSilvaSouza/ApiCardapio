import GenericData from "../../data/genericData";
import { IProduct } from '../../data/product';
import { IStore } from "../../data/store";
import { InterfaceStoryRepo } from "../../repository/store/IstoryRepository";
import StoreRepository from "../../repository/store/storeRepository";
import { StoreByUser, _FindService } from "./findService";


class FindProductByIdService {
    constructor(private StoreRepo:InterfaceStoryRepo<IStore,IProduct, StoreByUser>){}

    handleExecute = async (idProduct:number,storeId:number,userId:number): Promise<IProduct | null> => {
    
        const findProduct:IProduct | null = await this.StoreRepo.findProuctById(idProduct);

       if(findProduct) {
        if(!findProduct || findProduct.Id_Store !== storeId) throw ({statusCode:400,message:'Sem permissão para Buscar Produto'});
       }
       else{
        throw ({message:'Produto não encontrado'})
       }

        
        if(!findProduct){
            throw ({message:'Falha ao buscar produto'})
        }

        return findProduct ? findProduct : null;
    }

}

export const _FindProductByIdService = new FindProductByIdService(new StoreRepository());