import { IStore } from "../../data/store";

export interface InterfaceStoryRepo<T> {
  find(storeName?: string,type?:string,idUser?:number): Promise<T | null>;
  findAll(): Promise<T[] | null>;
  create(payload:T) : Promise<T | null>;
}

export default abstract class AbsStoreRepository
  implements InterfaceStoryRepo<IStore>
{
  abstract find(storeName?: string,type?:string,idUser?:number): Promise<IStore | null>;
  abstract findAll(): Promise<IStore[] | null>;
  abstract create(payload:IStore):Promise<IStore | null>; 
}
