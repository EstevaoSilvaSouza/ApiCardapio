import { NextFunction ,Request,Response} from 'express';

export const CheckPermission = (permissions:string[]) => {
    return (req:Request,res:Response,next:NextFunction) => {
        ValidatePermission(permissions,req,res,next);
    }
}

const ValidatePermission = (per:string[],req:Request, res:Response, next:NextFunction) => {
    const userPermission = req.User.Type;
    console.log(userPermission)
    if(per.some((a) => a.includes(userPermission))){
        next();
    }
    else {
        return res.status(401).json({message:'Permissão invalida!!'})
    }
}