import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";




export interface ILogAudit {
    Id?:number;
    Ip:string;
    ApiPath?:string;
    Body?:string;
    Type?:string;
    Method?:string;
}

export default class LogAudit extends Model<ILogAudit>{
    declare Ip:string;
    declare ApiPath:string;
    declare Body:string
    declare Type:string
    declare Method:string
}


LogAudit.init({
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    ApiPath:{
        type:DataTypes.TEXT('long'),
        allowNull:false
    },
    Body:{
        type:DataTypes.TEXT('long'),
        allowNull:false
    },
    Ip:{
        type:DataTypes.TEXT('long'),
        allowNull:false
    },
    Method:{
        type:DataTypes.TEXT('long'),
        allowNull:false
    },
    Type:{
        type:DataTypes.TEXT('long'),
        allowNull:false
    },
    
},
    {
        sequelize:_DbContext,
        freezeTableName:true,
        tableName:'LogAudit'
    }
)