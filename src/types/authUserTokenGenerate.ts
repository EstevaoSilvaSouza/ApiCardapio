import { IUser } from "../data/user";
import JWT from 'jsonwebtoken';
import { ObjGlobal } from "./globalConfi";


export const AuthTokenGenerate = (obj:IUser)  :string | undefined => {
   try{

    if(obj){
        const {Id,Name} = obj;
        return JWT.sign({Id,Name},ObjGlobal.passwordTokenGenerate,{expiresIn:'1h'});
    }
   }
   catch(error:any){
    return error;
   }
}