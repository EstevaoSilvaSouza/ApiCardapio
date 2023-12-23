"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateUserService = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const userRepository_1 = __importDefault(require("../../repository/user/userRepository"));
class CreateUserService {
    constructor(e) {
        this.e = e;
        this.handleExecute = async (t) => {
            const ObjCreate = new genericData_1.default(t).returnData();
            const newUser = await this.e.create(ObjCreate);
            if (!newUser) {
                throw { message: 'Falha ao cadastrar usuário', error: newUser };
            }
            return newUser;
        };
    }
}
exports._CreateUserService = new CreateUserService(new userRepository_1.default());
