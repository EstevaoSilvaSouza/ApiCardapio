import { IUser } from "../../data/user";
import { IUserRepository } from "../../repository/user/IuserRepository";
import UserRepository from "../../repository/user/userRepository";




class FindAllUserByStore {
    constructor(private s:IUserRepository<IUser>){}

    handleExecute = async (idStore:number): Promise<IUser[] | null> => {
        const find = await this.s.findAllUserByStore(idStore);
        if(!find){throw ({message:'Usuarios vazios'})}
        return find;
    }
}

export const _FindAllUserByStore = new FindAllUserByStore(new UserRepository());