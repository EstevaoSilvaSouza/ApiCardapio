import { Request, Response } from "express";
import { _FindService } from "../../../service/store/findService";
import { _CartFindItemService } from "../../../service/cart/findItemService";
import { _CreateService } from "../../../service/store/createService";
import { _FindStoreByUserService } from "../../../service/user/findStoreByUser";
import { checkTypeResponse } from "../../../types/checkTypeResponse";
import { _CreateProductService } from "../../../service/store/createProductService";
import { IProduct } from "../../../data/product";
import { _UpdateProductService } from "../../../service/store/updateProductService";
import { _FindProductByIdService } from "../../../service/store/findProductByIdService";
import { _FindAllCountService } from "../../../service/store/findAllCountService";
import { _CreateImageService } from "../../../service/image/CreateImageService";
import { _UpdateServiceSettingPage } from "../../../service/settingPage/updateService";

export default class StoreController {
  protected Find = async (req: Request, res: Response) => {
    const { Name, Type } = req.body;
    try {
      let StoreFind: any = await _FindService.Execute(Type, Name);
      if (StoreFind) {
        const Filter = StoreFind.Products.map((e: any) => e.Type);
        const Newmap = [...new Map(Filter.map((e: any) => [e, e])).values()];

        return res.status(200).json({
          Data: StoreFind,
          Categoria: Newmap,
        });
      } else {
        return res.status(404).json({
          Mensage: "Empresa não encontrada",
        });
      }
    } catch (e: any) {
      res.status(500).json({
        Mensage: "Erro de servidor, contate o administrador do sistema!",
        Erro: e,
      });
    }
  };

  protected Teste = async (req: Request, res: Response) => {
    return res.status(200).json({message:"Rota valida teste"})    
  };

  protected Create = async (req:Request,res:Response) => {
    const payload = req.body;

    try{
      const create = await _CreateService.handleExecute(payload);
      if(!create) return res.status(404).json({Message:'Falha ao criar usuario!', Date:new Date()})
      return res.status(200).json({Message:'Store criada com sucesso',Data:create})
    }
    catch(error:any){
      return res.status(500).json({
        Message:error.message,
        Date: new Date()
      })
    }
  };

  protected FindStoreByUser = async (req:Request,res:Response) => {
    const {Name} = req.body;

    if(!Name)return res.status(400).json({message:'Prop Name Store invalida.'});

    try{
      let findStoreByUser :any = await _FindStoreByUserService.handleExecute(req.User.Id,Name)
      if(checkTypeResponse(findStoreByUser?.id!).status === 401) return res.status(checkTypeResponse(findStoreByUser?.id!).status).json({
        message:checkTypeResponse(findStoreByUser?.id!).message,returnCode:findStoreByUser?.id!
      })

      return res.status(200).json({message:checkTypeResponse(findStoreByUser?.id!).message, returnCode:findStoreByUser?.id!,Store:findStoreByUser?.obj?.Stores[0]}); 
    }
    catch(error:any){

    }
  };

  protected CreateProduct = async (req:Request,res:Response) => {
    const {Name,Type,Value,Quantity,Description,Tag, Base64} = req.body;
    if(!Name || !Type || !Value || !Quantity || !Description || !Base64
      || !Tag) return res.status(400).json({message:'Falha ao cadastrar produto, dado nulo'});

      try{
        const idUser = req.User.Id;
        const findStoreByUserId:any = await _FindStoreByUserService.handleExecute(idUser,"store");
      
        if(findStoreByUserId?.obj){
          
          const idStore= findStoreByUserId.obj?.Stores[0]?.Id;
          const payload : IProduct = {Name,Type,Value,Quantity,Description,Tag};
         
          const addProduct = await _CreateProductService.handleExecute(payload,idStore);
          if(addProduct?.Id) {
            const t = await _CreateImageService.handleExecute(Base64,addProduct.Id, 'Product');
            console.log(t);
            return res.status(200).json({message:'Produto adicionado com sucesso'});
          }
          else{
            return res.status(400).json({message:'Falha ao cadastrar produto!'});
          }
        }
        else{
          return res.status(400).json({message:'Falha ao encontrar Store'});
        }
      }
      catch(error:any){
        return res.status(500).json({message:error})
      }
  };

  protected UpdateProduct = async (req:Request,res:Response) => {
    try{
      const payload:IProduct = req.body;
      const userId = req.User.Id;
      const storeId = req.User?.Stores[0]?.Id;
      const updateProduct = await _UpdateProductService.handleExecute(payload,storeId,userId);
      return res.status(200).json({message:'Produto Atualizado com sucesso', status:updateProduct, dataAlterada:payload})
    }
    catch(error:any){
      return res.status(500).json({message:error})
    }
  };

  protected UpdateColorCustomPage = async (req:Request,res:Response) => {
    const body = req.body;

    try{
      const idStore = req.User.Stores[0].Id;
      const update = await _UpdateServiceSettingPage.handleExecute(body,idStore);
      if(update && update[0] > 0) return res.status(200).json(update)
    }
    catch(error:any){
      return res.status(500).json({message:error.message});
    }
  }

  protected FindProductById = async (req:Request, res:Response) => {
    try{
      const {Id} = req.body
      if (typeof(Id) !== 'number'){return res.status(400).json({message:'Id invalido'})};
      const userId = req.User.Id;
      const storeId = req.User?.Stores[0]?.Id;

      const findProduct = await _FindProductByIdService.handleExecute(Id,storeId,userId);
      if(!findProduct) return res.status(400).json({message:'Falha ao encontrar produto'});
      return res.status(200).json({message:'Busca realizada com sucesso', produto:findProduct});
    } 
    catch(error:any){
      return res.status(error?.statusCode || 500).json({message:error?.message})
    }
  };

  protected GetAllCount = async (req:Request, res:Response) => {
    try{
      const NameStore = req.User?.Stores[0].Name;
      const storeId = req.User?.Stores[0]?.Id;
      const findCount = await _FindAllCountService.handleExecute(storeId,NameStore);
      if(!findCount) return res.status(400).json({message:'Nenhum dado para ser processado'});
      return res.status(200).json(findCount);
      
    }
    catch(error:any){
      return res.status(error?.statusCode || 500).json({message:error?.message})
    }
  }

}
