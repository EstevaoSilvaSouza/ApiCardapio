import GenericData from "../../data/genericData";
import { IUser } from "../../data/user";
import { IUserRepository } from "../../repository/user/IuserRepository";
import UserRepository from "../../repository/user/userRepository";

class CreateUserService {
    
    constructor(private e:IUserRepository<IUser>){}

    handleExecute = async (t: IUser): Promise<IUser | null> => {
        const ObjCreate = new GenericData<IUser>(t).returnData();
        const newUser = await this.e.create(ObjCreate);
    
        if (!newUser) {
            throw { message: 'Falha ao cadastrar usuário', error: newUser };
        }
    
        return newUser;
    };
}

export const _CreateUserService = new CreateUserService(new UserRepository());