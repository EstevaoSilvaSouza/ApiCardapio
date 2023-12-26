import { Image } from "../../data/image";
import Product from "../../data/product";
import Store, { IStore } from "../../data/store";
import AbsStoreRepository from "./IstoryRepository";

export default class StoreRepository implements AbsStoreRepository {
  async create(payload: IStore):Promise<IStore | null> {
    return await Store.create(payload);
  }
  
  async find(storeName?: string,type?:string,idUser?:number): Promise<IStore | null> {
    if(type === 'default'){
      return await Store.findOne({
        where: { Name: storeName },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Product,
          include: [
            { model: Image, attributes: { exclude: ["createdAt", "updatedAt"] } },
          ],
  
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });
    }
    else {
      return await Store.findOne({
        where: { IdUser:idUser},
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Product,
          include: [
            { model: Image, attributes: { exclude: ["createdAt", "updatedAt"] } },
          ],
  
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });
    }
    
  }

  async findAll(): Promise<IStore[] | null> {
    return await Store.findAll({ raw: true });
  }
}
