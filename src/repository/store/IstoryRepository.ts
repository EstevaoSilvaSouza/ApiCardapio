import { IStore } from "../../data/store";

interface InterfaceStoryRepo<T> {
  find(storeName: string): Promise<T | null>;
  findAll(): Promise<T[] | null>;
}

export default abstract class AbsStoreRepository
  implements InterfaceStoryRepo<IStore>
{
  abstract find(storeName: string): Promise<IStore | null>;
  abstract findAll(): Promise<IStore[] | null>;
}
