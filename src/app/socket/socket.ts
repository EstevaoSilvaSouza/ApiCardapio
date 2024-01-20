import {Socket,Server} from 'socket.io';
import http from 'http'; // Import http module
import { IOrder } from '../../data/order';

export const ArrayOrderTime = new Map();

class SocketServer {
    public io: Server;
  
    constructor() {
      this.io = new Server({cors:{
              origin: 'https://cardapio-web-pearl.vercel.app',
              methods: ['GET', 'POST', 'PUT'],
              credentials: false,
      }});
      this.initSocket();
    }
  
    public initialize(server: http.Server): void {
      this.io.attach(server);
    }
  
    public initSocket(): void {
      this.io.on('connection', (socket: Socket) => {
        console.log('Cliente conectado');
  
        socket.on('joinOrderRoom',(Id) => {
            console.log(`chegou ID aqui em ${Id}`);
            socket.join(Id);
            ArrayOrderTime.set(Id,socket.id);
        })

        socket.on('joinOrderPainel',(Name) => {
          console.log(`nova loja para lista pedido em!! ${Name}`)
          socket.join(Name);
          ArrayOrderTime.set(Name,socket.id);
        })

        socket.on('disconnect', () => {
          console.log('Cliente desconectado');
        });
      });
    }

    public sendOrderStatus(orderiD:any,status:string,IdItem:number): void {
        this.io.to(orderiD).emit('statusPedidoAlterado',{
            IdOrder:IdItem,
            Status:status
        })
    }

    public sendNewOrder(name:any,data:IOrder){
      this.io.to(name).emit('newOrder',{
        Id:data.Id,
        Data:data
      })
    }

  }

const socketInit = new SocketServer();
export default socketInit;