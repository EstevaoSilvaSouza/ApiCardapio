import { IOrder } from "../../data/order";
import { IProductsOrder } from "../../data/productsOrder";

export interface IResponseListAllOrders {
  Data:IOrder[] | null;
  TotalPagina:number;
  QtdItens:number;
}

export interface IGetAllCount {
  TotalPedidos:number;
  TotalProdutos:number;
  TotalPedidosDia:number;
  TotalPedidoMes:number;
  TotalPedidosAno:number;
  ValorVendaDia:number;
}
export interface ICartRepository<T> {
  Create(payload:IOrder): Promise<IOrder | null>;
  CreateProductOrder(payload:IProductsOrder[]) : Promise<IProductsOrder[] | null>;
  ListId(date: T, date2: T): Promise<T[] | null>;
  FindByIdOrder(idOrder:number):Promise<IOrder | null>;
  FindAllOrder(status:string,nameStore:string,qtdItens:number,page:number):Promise<IResponseListAllOrders | null>;
  UpdateOrderStatus(payload:IOrder):Promise<[affectedCount: number] | null>;
  GetAllCount(id:number,name:string):Promise<IGetAllCount | null>;
  DeleteOrder(idOrder:number):Promise<any>;
}

export abstract class CartAbsRepository implements ICartRepository<any> {
  abstract DeleteOrder(IdOrder:number):Promise<any>;
  abstract GetAllCount(id:number,name:string):Promise<IGetAllCount | null>;
  abstract FindAllOrder(status:string,nameStore:string,qtdItens:number,page:number):Promise<IResponseListAllOrders | null>;
  abstract UpdateOrderStatus(payload:IOrder):Promise<[affectedCount: number] | null>;
  abstract Create(payload:IOrder): Promise<IOrder | null>;
  abstract FindByIdOrder(idOrder:number):Promise<IOrder | null>;
  abstract CreateProductOrder(payload:IProductsOrder[]) : Promise<IProductsOrder[] | null>;
  abstract ListId(IdTable: number, CartName: string): Promise<any[] | null>;
}
