"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._FindUserById = void 0;
const userRepository_1 = __importDefault(require("../../repository/user/userRepository"));
class FindUserById {
    constructor(a) {
        this.a = a;
        this.handleExecute = async (idUser) => {
            const findUser = await this.a.findById(idUser);
            if (!findUser) {
                throw ({ message: 'Usuario não encontrado' });
            }
            return findUser;
        };
    }
}
exports._FindUserById = new FindUserById(new userRepository_1.default());
