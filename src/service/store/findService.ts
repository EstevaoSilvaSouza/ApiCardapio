import Store, { IStore } from "../../data/store";
import { InterfaceStoryRepo } from "../../repository/store/IstoryRepository";
import StoreRepository from "../../repository/store/storeRepository";

class FindService {
  constructor(private StoreRepository: InterfaceStoryRepo<IStore>) {}

  async Execute(
    type: string,
    name?: string,
    userId?:number,
    typeCheck?:number
  ): Promise<IStore | IStore[] | null> {
    let StoreResult: IStore | IStore[] | null = null;

    if (type === "one") {
      StoreResult = await this.StoreRepository.find(name!,'default');
    } else if (type === "all") {
      StoreResult = await this.StoreRepository.findAll()
    } else if (type === 'UserAuth' && typeCheck === 1010){
      StoreResult = await this.StoreRepository.find(name!,'UserStore',userId);
        if(StoreResult?.IdUser !== userId){
          StoreResult = null;
        }
    } else {
      StoreResult = null;
    }

    return StoreResult ?? null;
  }
}

export const _FindService = new FindService(new StoreRepository());
