"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateUserService = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const userRepository_1 = __importDefault(require("../../repository/user/userRepository"));
const createService_1 = require("../store/createService");
const findService_1 = require("../store/findService");
const findByUsername_1 = require("./findByUsername");
class CreateUserService {
    constructor(e) {
        this.e = e;
        this.handleExecute = async (t, nameStore) => {
            try {
                const ObjCreate = new genericData_1.default(t).returnData();
                //validar se existe a loja com mesmo nome.
                const checkStore = await findService_1._FindService.Execute('one', nameStore, 0, 0, 0);
                if (checkStore) {
                    throw { message: 'Falha ao cadastrar, Loja já existente.', error: 'S-2001' };
                }
                const checkUser = await findByUsername_1._FindByUserNew.handleExecute(ObjCreate.Username);
                if (checkUser) {
                    throw { message: 'Falha ao cadastrar, Usuario já existente.', error: 'U-2002' };
                }
                ObjCreate.Type = 'Admin';
                ObjCreate.Status = true;
                ObjCreate.IsActive = true;
                const newUser = await this.e.create(ObjCreate);
                if (!newUser) {
                    throw { message: 'Falha ao cadastrar usuário', error: newUser };
                }
                const newStore = await createService_1._CreateService.handleExecute({ Description: 'Loja Nova', ImageUrl: '', Name: nameStore, Type: '', IdUser: newUser.Id });
                if (newStore) {
                    const InsertStoreuSER = await this.e.createUserStore(newUser.Id, newStore.Id);
                    if (!InsertStoreuSER) {
                        throw ({ message: 'Falha no processo, favor contato o dev do sistema.', error: 'L-2111' });
                    }
                }
                return newUser;
            }
            catch (err) {
                return err;
            }
        };
    }
}
exports._CreateUserService = new CreateUserService(new userRepository_1.default());
