import { Request, Response } from "express";
import { _FindService } from "../../../service/store/findService";
import { _CartFindItemService } from "../../../service/cart/findItemService";
import { _CreateService } from "../../../service/store/createService";
import { _FindStoreByUserService } from "../../../service/user/findStoreByUser";
import { checkTypeResponse } from "../../../types/checkTypeResponse";

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
  }


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
  }
}
