import { Request, Response } from "express";
import { IOrder } from "../../../data/order";
import { _CreateOrderService } from "../../../service/cart/createOrderService";
import { _FindOrderByIdService } from "../../../service/cart/findByIdOrder";

export class CartController {
    protected async Create(req:Request,res:Response){
        try{
            const payload = req.body;
            console.log(payload);
            const createOrder = await _CreateOrderService.Execute(payload);
            if(!createOrder) return res.status(401).json({message:'Falha ao criar Order'});
            return res.status(200).json({message:'Order Criada com sucesso', Order:createOrder.Id, Itens:createOrder.Items})
        }   
        catch(error:any){
            return res.status(500).json({message:error})
        }
    }

    protected async FindOrder(req:Request,res:Response){
        try{
            const {Id} = req.body;
            const findOrder = await _FindOrderByIdService.Execute(Id);
            if(!findOrder)return res.status(401).json({message:"Falha ao buscar Order"});
            return res.status(200).json({message:"Order Encontrada",Pedido:findOrder})
        }
        catch(error:any){
            return res.status(500).json({message:error})
        }
    }
}