import { IProduct } from "../../data/product";
import { IStore } from "../../data/store";

export interface InterfaceStoryRepo<T,S> {
  find(storeName?: string,type?:string,idUser?:number): Promise<T | null>;
  findAll(): Promise<T[] | null>;
  create(payload:T) : Promise<T | null>;
  createProduct(payload:S): Promise<S | null>; 
  updateProduct(pyload:S): Promise<[affectedCount: number] | null>; 
  deleteProduct(pyload:S): Promise<S | null>; 
}

export default abstract class AbsStoreRepository
  implements InterfaceStoryRepo<IStore,IProduct>
{
  abstract find(storeName?: string,type?:string,idUser?:number): Promise<IStore | null>;
  abstract findAll(): Promise<IStore[] | null>;
  abstract create(payload:IStore):Promise<IStore | null>; 
  abstract createProduct(payload:IProduct):Promise<IProduct | null>; 
  abstract updateProduct(payload:IProduct):Promise<[affectedCount: number] | null>; 
  abstract deleteProduct(payload:IProduct):Promise<IProduct | null>; 
}
