import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";



export interface ISettingPage {
    Id?:number;
    ColorBackground?:string;
    FontPage?:string ;
    ColorButtonCategory?:string;
    ColorButtonInputCart?:string;
}


export default class SettingPage extends Model<ISettingPage> {
   declare ColorBackground?:string;
   declare FontPage?:string;
   declare  ColorButtonCategory?:string;
   declare ColorButtonInputCart?:string ;
}

SettingPage.init({
    Id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true
    },
    ColorBackground:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ColorButtonCategory:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ColorButtonInputCart:{
        type:DataTypes.STRING,
        allowNull:true
    },
    FontPage:{
        type:DataTypes.STRING,
        allowNull:true
    }
}, {
    sequelize:_DbContext,
    tableName:'SettingPage',
    freezeTableName:true
})


