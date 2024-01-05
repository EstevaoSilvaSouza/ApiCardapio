"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._AuthUser = void 0;
const userRepository_1 = __importDefault(require("../../repository/user/userRepository"));
class AuthUser {
    constructor(e) {
        this.e = e;
        this.handleExecute = async (s) => {
            try {
                const FindUser = await this.e.findByUserName(s.Username);
                console.log(FindUser === null || FindUser === void 0 ? void 0 : FindUser.Stores);
                if (FindUser === null) {
                    return { num: 2 };
                }
                else if (!(FindUser === null || FindUser === void 0 ? void 0 : FindUser.IsActive)) {
                    return { num: 10 }; //Usuario bloqueado
                }
                else if (!FindUser.Status) {
                    return { num: 1 }; //Usuario desativado
                }
                else if (FindUser.Username !== s.Username || FindUser.Password !== s.Password) {
                    return { num: 2 }; //Usuario / senha invalido
                }
                else {
                    return { num: 5, obj: FindUser }; //logado com sucesso
                }
            }
            catch ({ error }) {
                return error;
            }
            //return FindUser.Username !== s.Username || FindUser.Password !== s.Password ? false : true;
        };
    }
}
exports._AuthUser = new AuthUser(new userRepository_1.default());
