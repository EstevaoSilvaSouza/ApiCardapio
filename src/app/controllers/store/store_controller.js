"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const findService_1 = require("../../../service/store/findService");
class StoreController {
    constructor() {
        this.Find = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { Name, Type } = req.body;
            try {
                let StoreFind = yield findService_1._FindService.Execute(Type, Name);
                if (StoreFind) {
                    const Filter = StoreFind.Products.map((e) => e.Type);
                    const Newmap = [...new Map(Filter.map((e) => [e, e])).values()];
                    return res.status(200).json({
                        Data: StoreFind,
                        Categoria: Newmap,
                    });
                }
                else {
                    return res.status(404).json({
                        Mensage: "Empresa não encontrada",
                    });
                }
            }
            catch (e) {
                res.status(500).json({
                    Mensage: "Erro de servidor, contate o administrador do sistema!",
                    Erro: e,
                });
            }
        });
    }
}
exports.default = StoreController;
