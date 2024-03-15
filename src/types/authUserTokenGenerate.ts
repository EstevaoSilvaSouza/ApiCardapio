import { IUser } from "../data/user";
import JWT from 'jsonwebtoken';
import { ObjGlobal } from "./globalConfi";


export const AuthTokenGenerate = (obj:IUser)  :string | undefined => {
   try{
    if(obj){
        const {Id,Name, FullName,Stores, Type} = obj;
        return JWT.sign({Id,Name,FullName,Stores,Type},ObjGlobal.passwordTokenGenerate,{expiresIn:'1h'});
    }
   }
   catch(error:any){
    return error;
   }
}