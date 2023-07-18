import Store, { IStore } from "../../data/store";
import { InterfaceStoryRepo } from "../../repository/store/IstoryRepository";
import StoreRepository from "../../repository/store/storeRepository";

class FindService {
  constructor(private StoreRepository: InterfaceStoryRepo<IStore>) {}

  async Execute(
    type: string,
    name?: string
  ): Promise<IStore | IStore[] | null> {
    let StoreResult: IStore | IStore[] | null = null;

    if (type === "one") {
      StoreResult = await this.StoreRepository.find(name!);
    } else if (type === "all") {
      StoreResult = await this.StoreRepository.findAll();
    } else {
      StoreResult = null;
    }

    return StoreResult ?? null;
  }
}

export const _FindService = new FindService(new StoreRepository());
