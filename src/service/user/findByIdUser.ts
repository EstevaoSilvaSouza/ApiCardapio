import { IUser } from "../../data/user";
import { IUserRepository } from "../../repository/user/IuserRepository";
import UserRepository from "../../repository/user/userRepository";

class FindUserById {
    constructor(private a:IUserRepository<IUser>){}

    handleExecute = async (idUser:number):Promise<IUser | null> => {
        const findUser = await this.a.findById(idUser);
        if(!findUser){throw ({message:'Usuario não encontrado'})}
        return findUser;
     }
}

export const _FindUserById = new FindUserById(new UserRepository());