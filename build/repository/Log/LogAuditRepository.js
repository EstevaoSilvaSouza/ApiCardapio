"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logaudit_1 = __importDefault(require("../../data/logaudit"));
const ILogAuditRepository_1 = __importDefault(require("./ILogAuditRepository"));
class LogAuditRepository extends ILogAuditRepository_1.default {
    constructor() {
        super(...arguments);
        this.create = async (payload) => {
            return await logaudit_1.default.create(payload);
        };
    }
}
exports.default = LogAuditRepository;
