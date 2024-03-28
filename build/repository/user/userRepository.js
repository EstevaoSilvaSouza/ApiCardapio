"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settingPage_1 = __importDefault(require("../../data/settingPage"));
const store_1 = __importDefault(require("../../data/store"));
const user_1 = require("../../data/user");
const userStore_1 = require("../../data/userStore");
const IuserRepository_1 = __importDefault(require("./IuserRepository"));
class UserRepository extends IuserRepository_1.default {
    constructor() {
        super(...arguments);
        this.createAddStore = async (p, idStore) => {
            return await user_1.User.create(p);
        };
        this.create = async (p) => {
            return await user_1.User.create(p);
        };
        this.createUserStore = async (idUser, IdStore) => {
            return await userStore_1.UsuarioStore.create({ Id_Store: IdStore, Id_Usuario: idUser });
        };
        this.getAll = () => {
            throw ('ok');
        };
        this.findById = (id) => {
            return user_1.User.findByPk(id, {
                attributes: { exclude: ["Password", "createdAt", "updatedAt"] },
                include: [{
                        model: store_1.default, attributes: { exclude: ['createdAt', 'updatedAt'] }, through: { attributes: [] },
                        include: [{ model: settingPage_1.default, attributes: { exclude: ['Id', 'createdAt', 'updatedAt', 'Id_CustomSettingCss'] } }]
                    }]
            });
        };
        this.findAllUserByStore = async (idStore) => {
            return user_1.User.findAll({
                attributes: { exclude: ["Password", "createdAt", "updatedAt"] },
                include: [{
                        model: store_1.default, attributes: { exclude: ['createdAt', 'updatedAt', 'Stores'] }, through: { attributes: [] }, where: { Id: idStore }
                    }],
            });
        };
        this.findByUserName = async (u) => {
            return user_1.User.findOne({
                where: { Username: u },
                include: [
                    { model: store_1.default, attributes: { exclude: ["Type", "Description", "createdAt", "updatedAt", "IdUser",] }, through: { attributes: [] } },
                ]
            });
        };
        this.delete = (id) => {
            throw ('ok');
        };
        this.update = (p) => {
            throw ('ok');
        };
    }
}
exports.default = UserRepository;
