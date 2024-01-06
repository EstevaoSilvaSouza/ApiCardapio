"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._CreateOrderService = void 0;
const genericData_1 = __importDefault(require("../../data/genericData"));
const cartItemRepository_1 = require("../../repository/cart/cartItemRepository");
const findService_1 = require("../store/findService");
const createProductOrderService_1 = require("./createProductOrderService");
class CreateOrderService {
    constructor(s) {
        this.s = s;
        this.Execute = async (payload) => {
            var _a, _b;
            const OrderObj = new genericData_1.default(payload).returnData();
            OrderObj.StatusOrder = "Aguardando confirmação da Loja";
            const createOrder = await this.s.Create(OrderObj);
            if (!createOrder) {
                throw ({ message: 'Falha interna ao criar Order' });
            }
            const getIdStore = await findService_1._FindService.Execute('one', payload.NameCart);
            console.log(getIdStore);
            if (!getIdStore)
                throw ({ message: getIdStore });
            if (getIdStore.Id) {
                if (((_a = OrderObj.Items) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
                    const newObj = (_b = OrderObj.Items) === null || _b === void 0 ? void 0 : _b.map((e) => {
                        var _a, _b;
                        //e.Id = crypto.randomUUID();
                        e.Id_Order = createOrder.Id;
                        e.Value = ((_b = (_a = getIdStore.Products) === null || _a === void 0 ? void 0 : _a.find((a) => a.Id == e.Id_ProduRef)) === null || _b === void 0 ? void 0 : _b.Value) || e.Value;
                        e.Id_Store = getIdStore.Id;
                        return e;
                    });
                    //newObj?.map(async (e) => {
                    await createProductOrderService_1._CreateProductOrderService.Execute(newObj).catch((e) => { throw ({ message: e }); });
                    //})
                }
            }
            return createOrder ? createOrder : null;
        };
    }
}
exports._CreateOrderService = new CreateOrderService(new cartItemRepository_1.CartItemRepository());
