import { IProduct } from "../../data/product";
import Store, { IStore } from "../../data/store";
import { InterfaceStoryRepo } from "../../repository/store/IstoryRepository";
import StoreRepository from "../../repository/store/storeRepository";

export interface StoreByUser {
  Id: number,
	Status: boolean,
  Stores:{
    Id?: number,
    Name?: string,
    Type?: string,
    Description?: string,
    ImageUrl: string,
    UsuarioStore:{
      Id_Usuario: number,
			Id_Store: number,
			createdAt: Date,
			updatedAt: Date
    },
    Products?:IProduct[]
  }[]
}

class FindService {
  constructor(private StoreRepository: InterfaceStoryRepo<IStore,IProduct, StoreByUser>) {}

  async Execute(
    type: string,
    name?: string,
    userId?:number,
    typeCheck?:number,
    idStore?:number
  ): Promise<IStore | IStore[] | StoreByUser | null> {
    let StoreResult: IStore | IStore[] |  StoreByUser | null= null;

    if (type === "one") {
      StoreResult = await this.StoreRepository.find(name!,'default');
    } else if (type === "all") {
      StoreResult = await this.StoreRepository.findAll()
    } else if (type === 'UserAuth' && typeCheck === 1010){
      StoreResult = await this.StoreRepository.find(name!,'UserStore',userId);
      const tempResult: StoreByUser = StoreResult as any;
      if(tempResult.Stores[0].UsuarioStore.Id_Usuario !== userId ){
        StoreResult = null
      }
        
    } else {
      StoreResult = null;
    }
    
    return StoreResult ?? null;
  }
}

export const _FindService = new FindService(new StoreRepository());
