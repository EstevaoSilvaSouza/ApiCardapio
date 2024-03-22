import LogAudit, { ILogAudit } from "../../data/logaudit";
import LogAuditAbs from "./ILogAuditRepository";

export default class LogAuditRepository extends LogAuditAbs{
    create = async (payload: ILogAudit) : Promise<ILogAudit | null> => {
        return await LogAudit.create(payload);
    };
}