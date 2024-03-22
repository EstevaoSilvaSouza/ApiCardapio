"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateLogAudit = void 0;
const LogAuditRepository_1 = __importDefault(require("../../repository/Log/LogAuditRepository"));
class CreateLogAudit {
    constructor(s) {
        this.s = s;
        this.handleExecute = async (payload) => {
            try {
                const data = await this.s.create(payload);
                console.log(data);
                return data;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        };
    }
}
exports._CreateLogAudit = new CreateLogAudit(new LogAuditRepository_1.default());
