import Store from "../../data/store";
import { IUser, User } from "../../data/user";
import { UsuarioStore } from "../../data/userStore";
import UserAbs from "./IuserRepository";

export default class UserRepository implements UserAbs {
    createAddStore = async (p: IUser,idStore:number) :Promise<IUser | null> => {
        return await User.create(p).then((e) => UsuarioStore.create({Id_Store:idStore,Id_Usuario:e.Id!})) as IUser;       
    }
    create = async (p: IUser) : Promise<IUser | null> => {
         return await User.create(p);
    };
    getAll = () : Promise<IUser[] | null> => {
        throw ('ok')
    };
    findById = (id: number) : Promise<IUser | null> => {
        return User.findByPk(id,{
            attributes:{exclude:["Password","createdAt","updatedAt"]},
            include:[{
                model:Store, attributes:{exclude:['createdAt','updatedAt']},through:{attributes:[]}
            }]
        });
    };

    findAllUserByStore = async (idStore:number): Promise<IUser[] | null> =>{
        return User.findAll({
            attributes:{exclude:["Password","createdAt","updatedAt"]},
            
            include:[{
            
                model:Store,attributes:{exclude:['createdAt','updatedAt','Stores']}, through:{attributes:[]}, where:{Id:idStore}
            }],
            
        })
    }
    findByUserName = async (u: string) : Promise<IUser | null> => {
        return  User.findOne(
            {
            where:{Username:u},
            include:[
                {model:Store, attributes:{exclude:["Type","Description","createdAt","updatedAt","IdUser",]},through:{attributes:[]}},
            ]
        
            })
      
    };
    delete = (id: number) : Promise<boolean | null> => {
        throw ('ok')
    };
    update =(p: IUser) : Promise<IUser | null> => {
        throw ('ok')
    };
}