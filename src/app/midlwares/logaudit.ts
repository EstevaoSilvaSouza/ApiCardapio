import { NextFunction, Request, Response } from "express";
import { ILogAudit } from "../../data/logaudit";
import { _CreateLogAudit } from "../../service/log/CreateLogAuditService";


export const LogAuditMidlwReq = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('caiu aqui');
        const logPayload: ILogAudit = { 
            Ip: req.ip,
            ApiPath: req.path,
            Body:String(JSON.stringify(req.body)),
            Method: req.method,
            Type: String(JSON.stringify(req.cookies[0]))
        };

        await _CreateLogAudit.handleExecute(logPayload).finally(() => next());

    }
}


