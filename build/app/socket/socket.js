"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayOrderTime = void 0;
const socket_io_1 = require("socket.io");
exports.ArrayOrderTime = new Map();
class SocketServer {
    constructor() {
        this.io = new socket_io_1.Server({ cors: {
                origin: 'https://cardapio-web-pearl.vercel.app',
                methods: ['GET', 'POST', 'PUT'],
                credentials: true,
            } });
        this.initSocket();
    }
    initialize(server) {
        this.io.attach(server);
    }
    initSocket() {
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado');
            socket.on('joinOrderRoom', (Id) => {
                console.log(`chegou ID aqui em ${Id}`);
                socket.join(Id);
                exports.ArrayOrderTime.set(Id, socket.id);
            });
            socket.on('joinOrderPainel', (Name) => {
                console.log(`nova loja para lista pedido em!! ${Name}`);
                socket.join(Name);
                exports.ArrayOrderTime.set(Name, socket.id);
            });
            socket.on('disconnect', () => {
                console.log('Cliente desconectado');
            });
        });
    }
    sendOrderStatus(orderiD, status, IdItem) {
        this.io.to(orderiD).emit('statusPedidoAlterado', {
            IdOrder: IdItem,
            Status: status
        });
    }
    sendNewOrder(name, data) {
        this.io.to(name).emit('newOrder', {
            Id: data.Id,
            Data: data
        });
    }
}
const socketInit = new SocketServer();
exports.default = socketInit;
