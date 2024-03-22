import { ILogAudit } from "../../data/logaudit";
import { ILogAuditRepo } from "../../repository/Log/ILogAuditRepository";
import LogAuditRepository from "../../repository/Log/LogAuditRepository";




class CreateLogAudit {
    constructor(private s :ILogAuditRepo){}

    handleExecute = async (payload:ILogAudit) => {
        try{    
            const data = await this.s.create(payload);
            console.log(data)
            return data
        }   
        catch(error:any){
            console.log(error)
            return error;
        }
    }

}

export const _CreateLogAudit = new CreateLogAudit(new LogAuditRepository());