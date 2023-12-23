"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTypeResponse = void 0;
const checkTypeResponse = (statusResponse) => {
    let response;
    switch (Number(statusResponse)) {
        // RESPONSE LOGIN USER!
        case 10:
            response = { status: 403, message: 'Usuario bloqueado, favor entrar em contato junto ao administrador' };
            break;
        case 1:
            response = { status: 404, message: 'Usuario desativado, favor entrar em contato junto ao administrador' };
            break;
        case 2:
            response = { status: 401, message: 'Usuario / senha invalido, favor entrar em contato junto ao administrador' };
            break;
        case 5:
            response = { status: 200, message: 'Usuario logado com sucesso' };
            break;
        // RESPONSE BUSCA STORE POR USUARIO LOGADO!
        case 20:
            response = { status: 401, message: 'Sem permissão para acessar Store!' };
            break;
        case 30:
            response = { status: 200, message: 'Store encontrada com sucesso' };
            break;
        default:
            response = { status: 401, message: 'Usuario / senha invalido 2, favor entrar em contato junto ao administrador' };
            break;
    }
    return response;
};
exports.checkTypeResponse = checkTypeResponse;
