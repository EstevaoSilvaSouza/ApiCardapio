import GenericData from "../../data/genericData";
import { IStore } from '../../data/store';
import { IUser } from "../../data/user";
import { UsuarioStore } from "../../data/userStore";
import { IUserRepository } from "../../repository/user/IuserRepository";
import UserRepository from "../../repository/user/userRepository";
import { _CreateService } from "../store/createService";
import { _FindService } from "../store/findService";

class CreateUserService {
    
    constructor(private e:IUserRepository<IUser>){}

    handleExecute = async (t: IUser): Promise<IUser | null> => {
        const ObjCreate = new GenericData<IUser>(t).returnData();

        //validar se existe a loja com mesmo nome.
        const checkStore = await _FindService.Execute('one',ObjCreate.NameStore,0,0,0) as IStore
        if(checkStore){
            throw { message:'Falha ao cadastrar, Loja já existente.',error:'l-2001'}
        }
        console.log(checkStore)
        ObjCreate!.Type = 'Normal';
        ObjCreate!.Status = true;
        ObjCreate!.IsActive = true;
        const newUser = await this.e.create(ObjCreate);
        console.log(newUser)
        if (!newUser) {
            throw { message: 'Falha ao cadastrar usuário', error: newUser };
        }

        const newStore = await _CreateService.handleExecute({Description:'Loja Nova', ImageUrl:'', Name:ObjCreate.NameStore!,Type:'',IdUser:newUser.Id});
        if(newStore){
            console.log(newStore)
            const InsertStoreuSER = await UsuarioStore.create({Id_Store:newStore.Id!, Id_Usuario:newUser.Id!});
                if(!InsertStoreuSER){
                    console.log(InsertStoreuSER)
                    throw ({message:'Falha no processo, favor contato o dev do sistema.',error:'L-2111'})
                }
        }
    
        return newUser;
    };
}

export const _CreateUserService = new CreateUserService(new UserRepository());