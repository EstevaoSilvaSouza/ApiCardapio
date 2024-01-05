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
    const { Id, Name } = req.body;

    try {
      const Find = await _CartFindItemService.Execute(Id, Name);

      if (Find) {
        return res.status(200).json({
          Data: Find,
        });
      } else {
        return res.status(200).json({
          Mensagem: "Sem dado!",
        });
      }
    } catch (Error: any) {
      return res.status(500).json({
        Erro: Error,
      });
    }
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
      let findStoreByUser = await _FindStoreByUserService.handleExecute(req.User.Id,Name)
      if(checkTypeResponse(findStoreByUser?.id!).status === 401) return res.status(checkTypeResponse(findStoreByUser?.id!).status).json({
        message:checkTypeResponse(findStoreByUser?.id!).message,returnCode:findStoreByUser?.id!
      })

      return res.status(200).json({message:checkTypeResponse(findStoreByUser?.id!).message, returnCode:findStoreByUser?.id!,Store:findStoreByUser?.obj!}); 
    }
    catch(error:any){

    }
  };

  protected CreateProduct = async (req:Request,res:Response) => {
    const {Name,Type,Value,Quantity,Description,Tag} = req.body;
    if(!Name || !Type || !Value || !Quantity || !Description
      || !Tag) return res.status(400).json({message:'Falha ao cadastrar produto, dado nulo'});

      try{
        const idUser = req.User.Id;
        const findStoreByUserId:any = await _FindStoreByUserService.handleExecute(idUser,"store");
        if(findStoreByUserId?.obj){
          
          const { Id } = findStoreByUserId.obj;
          const payload : IProduct = {Name,Type,Value,Quantity,Description,Tag};
          console.log(Id);
          const addProduct = await _CreateProductService.handleExecute(payload,Id);
          if(addProduct?.Id) {
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
  }

  protected UpdateProduct = async (req:Request,res:Response) => {
    try{
      const payload:IProduct = req.body;
      const userId = req.User.Id;
      const storeId = req.User?.Store?.Id;
      const updateProduct = await _UpdateProductService.handleExecute(payload,storeId,userId);
      return res.status(200).json({message:'Produto Atualizado com sucesso', status:updateProduct, dataAlterada:payload})
    }
    catch(error:any){
      return res.status(500).json({message:error})
    }
  }
  protected FindProductById = async (req:Request, res:Response) => {
    try{
      const {Id} = req.body
      if (typeof(Id) !== 'number'){return res.status(400).json({message:'Id invalido'})};
      const userId = req.User.Id;
      const storeId = req.User?.Store?.Id;

      const findProduct = await _FindProductByIdService.handleExecute(Id,storeId,userId);
      if(!findProduct) return res.status(400).json({message:'Falha ao encontrar produto'});
      return res.status(200).json({message:'Busca realizada com sucesso', produto:findProduct});
    } 
    catch(error:any){
      return res.status(error?.statusCode || 500).json({message:error?.message})
    }
  }

}
