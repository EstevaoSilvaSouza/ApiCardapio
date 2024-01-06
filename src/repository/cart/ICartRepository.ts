import { IOrder } from "../../data/order";
import { IProductsOrder } from "../../data/productsOrder";

export interface ICartRepository<T> {
  Create(payload:IOrder): Promise<IOrder | null>;
  CreateProductOrder(payload:IProductsOrder) : Promise<IProductsOrder | null>;
  ListId(date: T, date2: T): Promise<T[] | null>;
  FindByIdOrder(idOrder:number):Promise<IOrder | null>;
}

export abstract class CartAbsRepository implements ICartRepository<any> {
  abstract Create(payload:IOrder): Promise<IOrder | null>;
  abstract FindByIdOrder(idOrder:number):Promise<IOrder | null>;
  abstract CreateProductOrder(payload:IProductsOrder) : Promise<IProductsOrder | null>;
  abstract ListId(IdTable: number, CartName: string): Promise<any[] | null>;
}
