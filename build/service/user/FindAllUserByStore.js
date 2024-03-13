"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._FindAllUserByStore = void 0;
const userRepository_1 = __importDefault(require("../../repository/user/userRepository"));
class FindAllUserByStore {
    constructor(s) {
        this.s = s;
        this.handleExecute = async (idStore) => {
            const find = await this.s.findAllUserByStore(idStore);
            if (!find) {
                throw ({ message: 'Usuarios vazios' });
            }
            return find;
        };
    }
}
exports._FindAllUserByStore = new FindAllUserByStore(new userRepository_1.default());
