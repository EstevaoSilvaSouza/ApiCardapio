import GenericData from "../../data/genericData";
import { IStore } from '../../data/store';
import { IUser } from "../../data/user";
import { UsuarioStore } from "../../data/userStore";
import { IUserRepository } from "../../repository/user/IuserRepository";
import UserRepository from "../../repository/user/userRepository";
import { _CreateServiceSettingPage } from "../settingPage/createService";
import { _CreateService } from "../store/createService";
import { _FindService } from "../store/findService";
import { _FindByUserNew, _FindbyUserService } from "./findByUsername";


export enum CssPageCustom {
    ColorBackground ='#fff',
    FontPage =  'default',
    ColorButtonCategory=  'orange',
    ColorButtonInputCart=  '090303b9',
    ColorHeaderTitleCategory=  '#000000',
    ColorFontCategory=  '#fff',
    ColorButtonAddProductCart=  'orange',
    ColorButtonCart=  'orange',
    ColorButtonHoverAddProductCart=  'orange',
    ColorFontHeader=  'orange',
    ColorFontHeaderCategory=  'orange',
    ColorHoverButtonCategory =  'red'
}

class CreateUserService {
    
    constructor(private e:IUserRepository<IUser>){}

    handleExecute = async (t: IUser,nameStore:string): Promise<IUser | null> => {
        try{
            const ObjCreate = new GenericData<IUser>(t).returnData();

            //validar se existe a loja com mesmo nome.
            const checkStore = await _FindService.Execute('one',nameStore,0,0,0) as IStore
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
    
            const newStore = await _CreateService.handleExecute({Description:'Loja Nova', ImageUrl:'', Name:nameStore!,Type:'',IdUser:newUser.Id})
            if(newStore){
                const newPageSettingCss = await _CreateServiceSettingPage.handleExecute({
                    ColorBackground :CssPageCustom.ColorBackground,
                    ColorButtonAddProductCart: CssPageCustom.ColorButtonAddProductCart,
                    ColorButtonHoverAddProductCart: CssPageCustom.ColorButtonHoverAddProductCart,
                    ColorButtonCart: CssPageCustom.ColorButtonCart,
                    ColorButtonCategory: CssPageCustom.ColorButtonCart,
                    ColorButtonInputCart:CssPageCustom.ColorButtonInputCart,
                    ColorFontCategory:CssPageCustom.ColorFontCategory,
                    ColorFontHeader:CssPageCustom.ColorFontHeader,
                    ColorFontHeaderCategory:CssPageCustom.ColorFontHeaderCategory,
                    ColorHeaderTitleCategory:CssPageCustom.ColorHeaderTitleCategory,
                    ColorHoverButtonCategory:CssPageCustom.ColorHoverButtonCategory,
                    FontPage:CssPageCustom.FontPage,
                    Id_CustomSettingCss:newStore.Id
                },Number(newStore.Id));

                if(!newPageSettingCss){ throw({message:'Falha ao processar css custom, favor contatar o dev.', erro:'L-2110'})}

                const InsertStoreuSER = await this.e.createUserStore(newUser.Id!,newStore.Id!);
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