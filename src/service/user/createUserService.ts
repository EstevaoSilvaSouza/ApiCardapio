import GenericData from "../../data/genericData";
import { IUser } from "../../data/user";
import { IUserRepository } from "../../repository/user/IuserRepository";
import UserRepository from "../../repository/user/userRepository";

class CreateUserService {
    constructor(private s:IUserRepository<IUser>){}

    handleExecute = async (payload:IUser,idStore:number) : Promise<IUser | null> => {
        try{
            const createObj = new GenericData<IUser>(payload).returnData();
            const find = await this.s.findByUserName(createObj.Username);

            if(find?.Username === payload.Username){
                throw({message:'Usuario já cadastrado.'})
            }
            if(find?.Email === payload?.Email){
                throw({message:'Email já cadastrado.'})
            }
            
            const user = await this.s.create(createObj);
            return user;
        }
        catch(e:any){
            return e;
        }
    }
}

export const _CreateUserServiceAdd = new CreateUserService(new UserRepository());