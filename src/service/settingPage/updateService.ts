import GenericData from "../../data/genericData";
import { ISettingPage } from "../../data/settingPage";
import { ISettingPageRepository } from "../../repository/settingPage/ISettingPageRepository";
import SettingPageRepository from '../../repository/settingPage/settingPageRepository';





class UpdateServiceSettingPage  {
    constructor(private s:ISettingPageRepository){}

    handleExecute = async (p:ISettingPage, idStore:number) : Promise<[affectedCount: number] | null>=> {
         const createObj = new GenericData<ISettingPage>({...p,Id_CustomSettingCss:idStore}).returnData();
         const create = await this.s.update(createObj,idStore);

         if(!create) throw({message:'Falha ao criar CSS Custom Default'})
         
         return create;
    }
}

export const _UpdateServiceSettingPage = new UpdateServiceSettingPage(new SettingPageRepository());

