import { Request, Response } from "express";
import { _FindService } from "../../../service/store/findService";
import { _CartFindItemService } from "../../../service/cart/findItemService";

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
}
