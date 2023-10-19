"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findService_1 = require("../../../service/store/findService");
const findItemService_1 = require("../../../service/cart/findItemService");
class StoreController {
    constructor() {
        this.Find = async (req, res) => {
            const { Name, Type } = req.body;
            try {
                let StoreFind = await findService_1._FindService.Execute(Type, Name);
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
        };
        this.Teste = async (req, res) => {
            const { Id, Name } = req.body;
            try {
                const Find = await findItemService_1._CartFindItemService.Execute(Id, Name);
                if (Find) {
                    return res.status(200).json({
                        Data: Find,
                    });
                }
                else {
                    return res.status(200).json({
                        Mensagem: "Sem dado!",
                    });
                }
            }
            catch (Error) {
                return res.status(500).json({
                    Erro: Error,
                });
            }
        };
    }
}
exports.default = StoreController;
