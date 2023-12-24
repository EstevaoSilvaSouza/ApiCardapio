import { Request, Response } from "express";

export const validateToken = (req:Request,res:Response) => {
    return res.status(200).json({message:'token valido',data:`${req?.User?.Name} ${req?.User?.FullName}`,returnCode:30});
}