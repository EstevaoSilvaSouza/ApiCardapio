import SettingPage from "../../data/settingPage";
import Store from "../../data/store";
import { IUser, User } from "../../data/user";
import { UsuarioStore } from "../../data/userStore";
import UserAbs from "./IuserRepository";

export default class UserRepository extends UserAbs {
    createAddStore = async (p: IUser,idStore:number) :Promise<IUser | null> => {
        return await User.create(p);
    }
    create = async (p: IUser) : Promise<IUser | null> => {
         return await User.create(p);
    };

    createUserStore = async (idUser:number,IdStore:number) : Promise<UsuarioStore>=> {
        return await UsuarioStore.create({Id_Store:IdStore, Id_Usuario:idUser})
    }
    getAll = () : Promise<IUser[] | null> => {
        throw ('ok')
    };
    findById = (id: number) : Promise<IUser | null> => {
        return User.findByPk(id,{
            attributes:{exclude:["Password","createdAt","updatedAt"]},
            include:[{
                model:Store, attributes:{exclude:['createdAt','updatedAt']},through:{attributes:[]},
                include:[{model:SettingPage, attributes:{exclude:['Id','createdAt','updatedAt','Id_CustomSettingCss']}}]
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