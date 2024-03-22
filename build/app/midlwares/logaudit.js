"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogAuditMidlwReq = void 0;
const CreateLogAuditService_1 = require("../../service/log/CreateLogAuditService");
const LogAuditMidlwReq = () => {
    return async (req, res, next) => {
        console.log('caiu aqui');
        const logPayload = {
            Ip: req.ip,
            ApiPath: req.path,
            Body: String(JSON.stringify(req.body)),
            Method: req.method,
            Type: String(JSON.stringify(req.cookies[0]))
        };
        await CreateLogAuditService_1._CreateLogAudit.handleExecute(logPayload).finally(() => next());
    };
};
exports.LogAuditMidlwReq = LogAuditMidlwReq;
