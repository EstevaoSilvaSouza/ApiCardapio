import GenericData from "../../data/genericData";
import { ISettingPage } from "../../data/settingPage";
import { ISettingPageRepository } from "../../repository/settingPage/ISettingPageRepository";
import SettingPageRepository from '../../repository/settingPage/settingPageRepository';





class CreateServiceSettingPage  {
    constructor(private s:ISettingPageRepository){}


    handleExecute = async (p:ISettingPage, idStore:number) : Promise<ISettingPage | null>=> {
         const createObj = new GenericData<ISettingPage>({...p,Id_CustomSettingCss:idStore}).returnData();
         const create = await this.s.create(createObj);

         if(!create) throw({message:'Falha ao criar CSS Custom Default'})
         
         return create;
    }
}

export const _CreateServiceSettingPage = new CreateServiceSettingPage(new SettingPageRepository());

