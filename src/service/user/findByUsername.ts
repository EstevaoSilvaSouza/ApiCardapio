import { IUser } from "../../data/user";
import { IUserRepository } from "../../repository/user/IuserRepository";
import UserRepository from "../../repository/user/userRepository";

export interface ILoginAuth {
    Username:string;
    Password:string;
}

class FindByUserName {
    constructor(private e:IUserRepository<IUser>){}

    handleExecute = async (s:ILoginAuth) : Promise<IUser | null> => {
        const findUser: IUser | null = await this.e.findByUserName(s.Username);
        
        if(!findUser) {
            throw ({message:'Falha ao realizar login', error:findUser})}

        return findUser ? findUser : null;
    }
}

export const _FindbyUserService = new FindByUserName(new UserRepository());


class FindByUserNew {
    constructor(private s:IUserRepository<IUser>){}

    handleExecute = async (s:string): Promise<IUser | null> => {
        return await this.s.findByUserName(s);
    }
}

export const _FindByUserNew = new FindByUserNew(new UserRepository())
