import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";
import Store from "./store";



export interface ISettingPage {
    Id?:number;
    ColorBackground?:string;
    FontPage?:string ;
    ColorButtonCategory?:string;
    ColorButtonInputCart?:string;
    ColorHeaderTitleCategory?:string;
    ColorFontCategory?:string;
    ColorButtonAddProductCart?:string;
    ColorButtonCart?:string;
    ColorButtonHoverAddProductCart?:string;
    ColorFontHeader?:string
    ColorFontHeaderCategory?:string;
    ColorHoverButtonCategory?:string;
    Id_CustomSettingCss?:number;
}


export default class SettingPage extends Model<ISettingPage> {
   declare ColorBackground?:string;
   declare FontPage?:string;
   declare  ColorButtonCategory?:string;
   declare ColorButtonInputCart?:string ;
   declare ColorHeaderTitleCategory?:string;
   declare ColorFontCategory?:string;
   declare ColorButtonAddProductCart?:string;
   declare  ColorButtonCart?:string;
   declare ColorButtonHoverAddProductCart?:string;
   declare  ColorFontHeader?:string
   declare ColorFontHeaderCategory?:string;
   declare ColorHoverButtonCategory?:string;
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
    },
    ColorButtonAddProductCart:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ColorFontCategory:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ColorHeaderTitleCategory:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ColorButtonCart:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ColorButtonHoverAddProductCart:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ColorFontHeader:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ColorFontHeaderCategory:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ColorHoverButtonCategory:{
        type:DataTypes.STRING,
        allowNull:true
    }
}, {
    sequelize:_DbContext,
    tableName:'SettingPage',
    freezeTableName:true
})


SettingPage.belongsTo(Store,{
    foreignKey:'Id_CustomSettingCss',
    constraints: true,
  foreignKeyConstraint: true,
});

Store.hasOne(SettingPage, {
    foreignKey:'Id_CustomSettingCss',
    constraints: true,
    foreignKeyConstraint: true
});

