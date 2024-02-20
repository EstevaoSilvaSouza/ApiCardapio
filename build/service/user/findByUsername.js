"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._FindbyUserService = void 0;
const userRepository_1 = __importDefault(require("../../repository/user/userRepository"));
class FindByUserName {
    constructor(e) {
        this.e = e;
        this.handleExecute = async (s) => {
            const findUser = await this.e.findByUserName(s.Username);
            if (!findUser) {
                throw ({ message: 'Falha ao realizar login', error: findUser });
            }
            return findUser ? findUser : null;
        };
    }
}
exports._FindbyUserService = new FindByUserName(new userRepository_1.default());
