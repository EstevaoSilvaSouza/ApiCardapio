import { Image } from "../../data/image";
import Product, { IProduct } from "../../data/product";
import Store, { IStore } from "../../data/store";
import { User } from "../../data/user";
import { UsuarioStore } from "../../data/userStore";
import { StoreByUser } from "../../service/store/findService";
import AbsStoreRepository from "./IstoryRepository";

export default class StoreRepository implements AbsStoreRepository {
  async findProuctById(Id: number): Promise<IProduct | null>{
   return await Product.findByPk(Id);
  }
  async updateProduct(payload: IProduct): Promise<[affectedCount: number] | null> {
    return await Product.update(payload, {where:{Id:payload.Id }})
  }
  deleteProduct(payload: IProduct): Promise<IProduct | null> {
    throw new Error("Method not implemented.");
  }
  async createProduct(p:IProduct): Promise<IProduct | null> {
    return await Product.create(p); 
  }
  async create(payload: IStore):Promise<IStore | null> {
    return await Store.create(payload);
  }
  
  async find(storeName?: string,type?:string,idUser?:number): Promise<IStore | StoreByUser | null> {
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
      const t :any= await User.findOne({
        where: { Id: idUser },
        attributes: { exclude: ["createdAt", "updatedAt","FullName","Email","IsActive","Password","Type","Username","Name"]},
        include: [
          {
            model: Store,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include:[{
              model:Product,
              include:[{model:Image,attributes: { exclude: ["createdAt", "updatedAt"] },}]
            }]
          },
  
        ],
      });
    

      return t;
    }
    
  }

  async findAll(): Promise<IStore[] | null> {
    return await Store.findAll({ raw: true });
  }
}
