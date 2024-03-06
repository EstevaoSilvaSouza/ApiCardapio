import { Request, Response } from "express";
import { IOrder } from "../../../data/order";
import { _CreateOrderService } from "../../../service/cart/createOrderService";
import { _FindOrderByIdService } from "../../../service/cart/findByIdOrder";
import { _UpdateOrderStatus } from "../../../service/cart/updateStatusOrder";
import { _FindAllOrderStore } from "../../../service/cart/findAllOrderStore";
import socketInit, { ArrayOrderTime } from "../../socket/socket";

export class CartController {
    protected async Create(req:Request,res:Response){
        try{
            const payload = req.body;
            if(!payload.buyerName || !payload.buyerPhone){
              return res.status(500).json({message:'Falha ao criar Pedido, campos em branco'})
            }
            const createOrder = await _CreateOrderService.Execute(payload);
            if(!createOrder) return res.status(401).json({message:'Falha ao criar Order'});
            if(ArrayOrderTime.has(payload.NameCart)){
              socketInit.sendNewOrder(ArrayOrderTime.get(payload.NameCart),createOrder);
            }
            
            return res.status(200).json({message:'Order Criada com sucesso', Order:createOrder.Id, Itens:createOrder.Items})
        }   
        catch(error:any){
            return res.status(500).json({message:error})
        }
    }

    protected async FindOrder(req:Request,res:Response){
        try{
            const {Id} = req.params;
            const findOrder = await _FindOrderByIdService.Execute(Number(Id));
            if(!findOrder)return res.status(401).json({message:"Falha ao buscar Order"});
            return res.status(200).json({message:"Order Encontrada",Pedido:findOrder})
        }
        catch(error:any){
            return res.status(500).json({message:error})
        }
    }

    protected UpdateStatusOrderStore = async (req:Request,res:Response) => {
        try{
          const Payload:IOrder = req.body;
          const NameStore = req.User?.Stores[0].Name;
          const IdUser = req.User?.Id;
          const updateProdutOrder = await _UpdateOrderStatus.handleExecute(Payload,NameStore,IdUser);
          if(!this.UpdateStatusOrderStore) return res.status(400).json({message:'Falha ao atualizar produto'});
          console.log(ArrayOrderTime)
          if(ArrayOrderTime.has(String(Payload.Id))){
            socketInit.sendOrderStatus(ArrayOrderTime.get(String(Payload.Id)),Payload.StatusOrder!,Payload.Id!);
          }
          return res.status(200).json({message:'Produto atualizado com sucesso',status:updateProdutOrder, data:Payload})
        }
        catch(error:any){
          res.status(500).json({message:error});
        }
      }

      protected ListAllOrders = async (req:Request,res:Response) => {
        try{
            const nameStore = req.User?.Stores[0].Name;
            const {QtdItensPage, Page,Status} = req.params;
            const findAll = await _FindAllOrderStore.Execute(Status,nameStore,Number(QtdItensPage),Number(Page));
            if(!findAll) return res.status(400).json({message:'Falha ao encontrar as Orders'});
            return res.status(200).json({message:'Orders encontradas com sucesso',Orders:findAll})
        }
        catch(error:any){
            res.status(500).json({message:error});
        }
      }
}