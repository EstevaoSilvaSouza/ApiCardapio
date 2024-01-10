import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken';
import { decode } from "punycode";

export const AuhHttpOnly = (req:Request,res:Response,next:NextFunction) => {

    const token = req.cookies?._xc0d3_t0k3n;

    if(!token) return res.status(401).json({Date:new Date(),isAuth:false})
    
    try{
        const decoded = JWT.verify(token,'1234');
        req.User = decoded;
        //console.log(req)
        next()
       // USAR AQUI O NEXT E COLOCAR DENTRO DO REQ.USER O DECODED!!  res.status(200).json({Date:new Date(),isAuth:true,Data:decoded});    
    }
    catch(error:any){
        res.status(401).json({Date:new Date(),isAuth:false})
        console.error(error);
    }

}