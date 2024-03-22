import { ILogAudit } from "../../data/logaudit";

export interface ILogAuditRepo {
    create:(payload:ILogAudit) => Promise<ILogAudit | null>;
}

export default abstract class LogAuditAbs implements ILogAuditRepo {
    abstract create:(payload:ILogAudit) => Promise<ILogAudit | null>;
}