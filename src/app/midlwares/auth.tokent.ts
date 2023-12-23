import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken';
import { ObjGlobal } from "../../types/globalConfi";

declare global {
    namespace Express {
        interface Request{
            User: any            ;
        }
    }
}

export const AuthUser = (req:Request,res:Response,next:NextFunction) => {
    const AssignatureTokenBearer = req.headers['authorization'];

    if(AssignatureTokenBearer?.split(' ')[0] !== 'Bearer')return res.status(401).json({message:'Token nulo/invalido - utilize Bearer valido.'})
    if(AssignatureTokenBearer?.split(' ')[1] === null || AssignatureTokenBearer?.split(' ')[1] === undefined )return res.status(401).json({message:'Token Nulo verifique e envie Novamente.'})
    
    JWT.verify(AssignatureTokenBearer?.split(' ')[1],ObjGlobal.passwordTokenGenerate,(error,decoded) => {
        if(error)return res.status(401).json({message:'Token expirado', Auth:false});

        req.User = decoded;
        console.log(req.User.Id);
        next();
    })

    
}