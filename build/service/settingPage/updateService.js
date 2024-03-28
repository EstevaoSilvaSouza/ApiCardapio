"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._UpdateServiceSettingPage = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const settingPageRepository_1 = __importDefault(require("../../repository/settingPage/settingPageRepository"));
class UpdateServiceSettingPage {
    constructor(s) {
        this.s = s;
        this.handleExecute = async (p, idStore) => {
            const createObj = new genericData_1.default(Object.assign(Object.assign({}, p), { Id_CustomSettingCss: idStore })).returnData();
            const create = await this.s.update(createObj, idStore);
            if (!create)
                throw ({ message: 'Falha ao criar CSS Custom Default' });
            return create;
        };
    }
}
exports._UpdateServiceSettingPage = new UpdateServiceSettingPage(new settingPageRepository_1.default());
