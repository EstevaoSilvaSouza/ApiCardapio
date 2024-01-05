import { IProduct } from "../../data/product";
import { IStore } from "../../data/store";
import { StoreByUser } from "../../service/store/findService";

export interface InterfaceStoryRepo<T,S,X> {
  find(storeName?: string,type?:string,idUser?:number): Promise<T | X | null>;
  findAll(): Promise<T[] | null>;
  create(payload:T) : Promise<T | null>;
  createProduct(payload:S): Promise<S | null>; 
  updateProduct(pyload:S): Promise<[affectedCount: number] | null>; 
  deleteProduct(pyload:S): Promise<S | null>; 
  findProuctById(Id:number): Promise<S | null>;
}

export default abstract class AbsStoreRepository
  implements InterfaceStoryRepo<IStore,IProduct,StoreByUser >
{
  abstract findProuctById(Id: number): Promise<IProduct | null>;
  abstract find(storeName?: string,type?:string,idUser?:number): Promise<IStore | StoreByUser | null>;
  abstract findAll(): Promise<IStore[] | null>;
  abstract create(payload:IStore):Promise<IStore | null>; 
  abstract createProduct(payload:IProduct):Promise<IProduct | null>; 
  abstract updateProduct(payload:IProduct):Promise<[affectedCount: number] | null>; 
  abstract deleteProduct(payload:IProduct):Promise<IProduct | null>; 
}
