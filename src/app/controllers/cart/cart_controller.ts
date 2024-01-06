import { Request, Response } from "express";
import { IOrder } from "../../../data/order";
import { _CreateOrderService } from "../../../service/cart/createOrderService";

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
}