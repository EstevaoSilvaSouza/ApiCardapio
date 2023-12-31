"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const dbContext_1 = require("./dbContext");
const store_1 = __importDefault(require("./store"));
const userStore_1 = require("./userStore");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    FullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Formato de Email invalido!'
            }
        }
    },
    IsActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 12],
                msg: 'Tamanho minimo ou maximo invalido. Minimo 5 caractere Maximo 12'
            }
        }
    },
    Status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    Type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [5, 20],
                msg: 'Tamanho minimo ou maximo invalido. Minimo 5 caractere Maximo 20'
            },
            isAlpha: {
                msg: 'Permitido apenas Letras sem caracteres especiais e numeros!'
            }
        }
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: dbContext_1._DbContext,
    tableName: 'User'
});
User.belongsToMany(store_1.default, { through: userStore_1.UsuarioStore, foreignKey: "Id_Usuario" });
store_1.default.belongsToMany(User, { through: userStore_1.UsuarioStore, foreignKey: "Id_Store" });
