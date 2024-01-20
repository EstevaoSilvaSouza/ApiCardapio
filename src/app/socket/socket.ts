import {Socket,Server} from 'socket.io';
import http from 'http'; // Import http module
import { IOrder } from '../../data/order';

export const ArrayOrderTime = new Map();
export const Array2Teste = new Map();

class SocketServer {
    public io: Server;
  
    constructor() {
      this.io = new Server({cors:{
              origin: 'https://cardapio-web-pearl.vercel.app',
              methods: ['GET', 'POST', 'PUT'],
              credentials: true,
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
            Array2Teste.set(Id,socket.id);
            console.log(Array2Teste);
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
      console.log(`enviado para ${orderiD}`)
      this.io.to(orderiD).emit('testEvent', { message: 'This is a test event' });
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