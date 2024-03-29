import { DataTypes, Model } from "sequelize";
import { _DbContext } from "./dbContext";
import Store, { IStore } from "./store";
import { UsuarioStore } from "./userStore";



export interface IUser {
    Id?:number;
    Name?:string;
    FullName?:string;
    Username:string;
    Email:string;
    Password:string;
    Type:string;
    Status:boolean;
    IsActive:boolean;
    Stores?:IStore[];
}


export class User extends Model<IUser> {
    declare Id?:number;
    declare Name:string;
    declare FullName:string;
    declare Username:string;
    declare Email:string;
    declare Password:string;
    declare Type:string;
    declare Status:boolean;
    declare IsActive:boolean;
}


User.init({
    Id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true,
    },
    FullName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
          isEmail:{
            msg:'Formato de Email invalido!'
          }
        }
    },
    IsActive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    Password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:{
                args:[6,12],
                msg:'Tamanho minimo ou maximo invalido. Minimo 5 caractere Maximo 12'
            }
        }
    },
    Status:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    Type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            len:{
                args:[5,20],
                msg:'Tamanho minimo ou maximo invalido. Minimo 5 caractere Maximo 20'
            },
            isAlpha:{
                msg:'Permitido apenas Letras sem caracteres especiais e numeros!'
            }
        }
    },
    Name:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize:_DbContext,
    tableName:'User'
})

User.belongsToMany(Store, { through: UsuarioStore, foreignKey: "Id_Usuario" });
Store.belongsToMany(User, { through: UsuarioStore, foreignKey: "Id_Store" });