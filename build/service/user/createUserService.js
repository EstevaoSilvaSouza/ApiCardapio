"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateUserServiceAdd = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const userRepository_1 = __importDefault(require("../../repository/user/userRepository"));
class CreateUserService {
    constructor(s) {
        this.s = s;
        this.handleExecute = async (payload, idStore) => {
            try {
                const createObj = new genericData_1.default(payload).returnData();
                const find = await this.s.findByUserName(createObj.Username);
                if ((find === null || find === void 0 ? void 0 : find.Username) === payload.Username) {
                    throw ({ message: 'Usuario já cadastrado.' });
                }
                if ((find === null || find === void 0 ? void 0 : find.Email) === (payload === null || payload === void 0 ? void 0 : payload.Email)) {
                    throw ({ message: 'Email já cadastrado.' });
                }
                const user = await this.s.create(createObj);
                return user;
            }
            catch (e) {
                return e;
            }
        };
    }
}
exports._CreateUserServiceAdd = new CreateUserService(new userRepository_1.default());
