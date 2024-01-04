import { IUser } from "../../data/user";
import { IUserRepository } from "../../repository/user/IuserRepository";
import UserRepository from "../../repository/user/userRepository";
import { ILoginAuth } from './findByUsername';

class  AuthUser {

    constructor(private e: IUserRepository<IUser>){}

    handleExecute = async (s:ILoginAuth) : Promise<{num:number, obj?:IUser} | null> => {
        
        try{
            const FindUser : IUser | null = await this.e.findByUserName(s.Username);
            console.log(FindUser?.Store);
            if(FindUser === null){
                return {num:2};
            }
            else if(!FindUser?.IsActive){
                return  {num:10}; //Usuario bloqueado
            }
            else if (!FindUser.Status){
                return  {num:1};  //Usuario desativado
            }
            else if (FindUser.Username !== s.Username || FindUser.Password !== s.Password ){
                return  {num:2};  //Usuario / senha invalido
            }
            else {
                return  {num:5,obj:FindUser};  //logado com sucesso
            }
        }
        catch({error}:any){
            return error
        }
      
       
         //return FindUser.Username !== s.Username || FindUser.Password !== s.Password ? false : true;
    }
}

export const _AuthUser = new AuthUser(new UserRepository());