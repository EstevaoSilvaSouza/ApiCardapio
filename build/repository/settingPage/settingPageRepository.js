"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settingPage_1 = __importDefault(require("../../data/settingPage"));
const ISettingPageRepository_1 = require("./ISettingPageRepository");
class SettingPageRepository extends ISettingPageRepository_1.ISettingsPageAbs {
    constructor() {
        super(...arguments);
        this.create = async (p) => {
            return await settingPage_1.default.create(p);
        };
        this.update = async (s, storeIdUser) => {
            return await settingPage_1.default.update(s, { where: { Id_CustomSettingCss: storeIdUser } });
        };
    }
}
exports.default = SettingPageRepository;
