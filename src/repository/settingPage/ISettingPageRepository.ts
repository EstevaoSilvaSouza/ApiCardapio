import { ISettingPage } from "../../data/settingPage";





export interface ISettingPageRepository {
    create : (p:ISettingPage) => Promise<ISettingPage | null>;
    update: (s:ISettingPage,storeIdUser:number) => Promise<[affectedCount: number]>;
}


export abstract class ISettingsPageAbs implements ISettingPageRepository {
    abstract create: (p: ISettingPage) => Promise<ISettingPage | null>;
    abstract update: (s: ISettingPage,storeIdUser:number) => Promise<[affectedCount: number]>;
}