import { Request, Response } from "express";

export const validateToken = (req:Request,res:Response) => {
    const userStore = req.User.Stores[0].Name;
    return res.status(200).json({message:'token valido',data:userStore,returnCode:30});
}