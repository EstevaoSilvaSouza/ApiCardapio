"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateServiceSettingPage = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const settingPageRepository_1 = __importDefault(require("../../repository/settingPage/settingPageRepository"));
class CreateServiceSettingPage {
    constructor(s) {
        this.s = s;
        this.handleExecute = async (p, idStore) => {
            const createObj = new genericData_1.default(Object.assign(Object.assign({}, p), { Id_CustomSettingCss: idStore })).returnData();
            const create = await this.s.create(createObj);
            if (!create)
                throw ({ message: 'Falha ao criar CSS Custom Default' });
            return create;
        };
    }
}
exports._CreateServiceSettingPage = new CreateServiceSettingPage(new settingPageRepository_1.default());
