import { Request, Response } from "express";
import { _CreateUserService } from "../../../service/user/createService";
import { _FindbyUserService } from "../../../service/user/findByUsername";
import { _AuthUser } from "../../../service/user/authUserService";
import { IUser } from '../../../data/user';
import { checkTypeResponse } from "../../../types/checkTypeResponse";
import { AuthTokenGenerate } from "../../../types/authUserTokenGenerate";


export default class UserController {
    protected async NewUser (req:Request,res:Response) {
        const payload = req.body;

        if(!payload) return res.status(500).json()

        try{
            const create = await _CreateUserService.handleExecute(payload);
            if(!create?.Id)return res.status(404).json({error:create})
            return res.status(200).json(create)
        }
        catch ({ error }: any) {
            console.error(error);
            return res.status(500).json({
                Message: error?.message || 'Erro desconhecido',
                Data: new Date(),
                Error: error
            });
        }
    }

    protected async AuthUser (req:Request,res:Response) {
        const { Username, Password} = req.body;

 
        if(!Username || !Password) return res.status(404).json({message:'Usuario/Senha em branco!'});

        try{
            const validateAuth = await _AuthUser.handleExecute({Username,Password});
            
            if(checkTypeResponse(validateAuth?.num!).status === 403 || checkTypeResponse(validateAuth?.num!).status === 404 ||checkTypeResponse(validateAuth?.num!).status === 401 ) return res.status(checkTypeResponse(validateAuth?.num!).status).json({message:checkTypeResponse(validateAuth?.num!).message,returnCode:validateAuth?.num});
            return res.status(200).json({message:checkTypeResponse(validateAuth?.num!).message, returnCode:validateAuth?.num,token:AuthTokenGenerate(validateAuth?.obj!)}); 
        }
        catch ({ error }: any) {
            
            return res.status(500).json({
                Message: error?.message || 'Erro desconhecido',
                Data: new Date(),
                Error: error
            });
        }
    }
}