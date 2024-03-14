import GenericData from "../../data/genericData";
import { IStore } from '../../data/store';
import { IUser } from "../../data/user";
import { UsuarioStore } from "../../data/userStore";
import { IUserRepository } from "../../repository/user/IuserRepository";
import UserRepository from "../../repository/user/userRepository";
import { _CreateService } from "../store/createService";
import { _FindService } from "../store/findService";
import { _FindByUserNew, _FindbyUserService } from "./findByUsername";

class CreateUserService {
    
    constructor(private e:IUserRepository<IUser>){}

    handleExecute = async (t: IUser): Promise<IUser | null> => {
        try{
            const ObjCreate = new GenericData<IUser>(t).returnData();

            //validar se existe a loja com mesmo nome.
            const checkStore = await _FindService.Execute('one',ObjCreate.NameStore,0,0,0) as IStore
            if(checkStore){
                throw { message:'Falha ao cadastrar, Loja já existente.',error:'S-2001'}
            }
            
            const checkUser = await _FindByUserNew.handleExecute(ObjCreate.Username);

            if(checkUser){
                throw { message:'Falha ao cadastrar, Usuario já existente.',error:'U-2002'}
            }

            ObjCreate!.Type = 'Admin';
            ObjCreate!.Status = true;
            ObjCreate!.IsActive = true;
            const newUser = await this.e.create(ObjCreate);

            if (!newUser) {
                throw { message: 'Falha ao cadastrar usuário', error: newUser };
            }
    
            const newStore = await _CreateService.handleExecute({Description:'Loja Nova', ImageUrl:'', Name:ObjCreate.NameStore!,Type:'',IdUser:newUser.Id});
            if(newStore){
                const InsertStoreuSER = await UsuarioStore.create({Id_Store:newStore.Id!, Id_Usuario:newUser.Id!});
                    if(!InsertStoreuSER){
                        throw ({message:'Falha no processo, favor contato o dev do sistema.',error:'L-2111'})
                    }
            }
        
            return newUser;
        }
        catch(err:any){
            return err
        }
        
    };
}

export const _CreateUserService = new CreateUserService(new UserRepository());