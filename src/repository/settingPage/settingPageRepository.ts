import SettingPage, { ISettingPage } from "../../data/settingPage";
import { ISettingsPageAbs } from "./ISettingPageRepository";


export default class SettingPageRepository extends ISettingsPageAbs {
    create = async (p: ISettingPage) : Promise<ISettingPage | null> => {
        return await SettingPage.create(p);
    };
    update = async (s: ISettingPage,storeIdUser:number) : Promise<[affectedCount: number]> => {
        return await SettingPage.update(s,{where:{Id_CustomSettingCss:storeIdUser}})
    };

}