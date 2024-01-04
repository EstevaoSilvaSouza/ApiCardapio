import Store from "../../data/store";
import { IUser, User } from "../../data/user";
import UserAbs from "./IuserRepository";

export default class UserRepository implements UserAbs {
    create = async (p: IUser) : Promise<IUser | null> => {
        try {
            return await User.create(p);
        } catch (error:any) {
            return error;
        }
      
    };
    getAll = () : Promise<IUser[] | null> => {
        throw ('ok')
    };
    findById = (id: number) : Promise<IUser | null> => {
        throw ('ok')
    };
    findByUserName = async (u: string) : Promise<IUser | null> => {
        return await User.findOne(
            {where:{Username:u},
            include:[{model:Store, attributes:{exclude:["Type","Description","createdAt","updatedAt","IdUser"]}}]})
    };
    delete = (id: number) : Promise<boolean | null> => {
        throw ('ok')
    };
    update =(p: IUser) : Promise<IUser | null> => {
        throw ('ok')
    };
}