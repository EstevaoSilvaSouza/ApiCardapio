import { IStore } from '../../data/store';
import { IUser } from '../../data/user';
import { IUserRepository } from "../../repository/user/IuserRepository";
import { _FindService } from "../store/findService";


class FindStoreByUser {
    //constructor(private a:IUserRepository<IUser>){}

    handleExecute = async (idUser:number,name:string): Promise<{id:number,obj?:IStore | IStore[]} | null> => {
       const findStoreByUserId =   await _FindService.Execute('UserAuth',name,idUser,1010);
       
       if(!findStoreByUserId){
        return {id:20}
       }
       else{
        return {id:30, obj:findStoreByUserId}
       }
    }
}

export const _FindStoreByUserService = new FindStoreByUser();