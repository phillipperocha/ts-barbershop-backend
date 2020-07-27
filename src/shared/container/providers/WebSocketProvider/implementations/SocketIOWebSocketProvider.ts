import { Application } from 'express';
import socketIo from 'socket.io';
import { createServer, Server } from 'http';

import Events from '@shared/container/providers/WebSocketProvider/enums/Events';
import { IChatMessage } from '@shared/container/providers/WebSocketProvider/dtos/IChatMessage';

import IWebSocketProvider from '../models/IWebSocketProvider';

class SocketIOWebSocketProvider implements IWebSocketProvider {
  private static instance: SocketIOWebSocketProvider;

  public io: SocketIO.Server;

  constructor() {
    SocketIOWebSocketProvider.instance = this;
    if (SocketIOWebSocketProvider.instance) {
      return SocketIOWebSocketProvider.instance;
    }
  }

  public static getInstance(): SocketIOWebSocketProvider | null {
    return SocketIOWebSocketProvider.instance;
  }

  public initSocket(app: Application): Server {
    const server = createServer(app);
    this.io = socketIo(server);
    this.listen(this.io);
    return server;
  }

  private listen(io: SocketIO.Server): void {
    io.on(Events.CONNECT, (socket: any) => {
      console.log('Client connected');

      socket.on(Events.MESSAGE, (m: IChatMessage) => {
        console.log('[server](message): %s', JSON.stringify(m));
        io.emit('message', m);
      });

      socket.on(Events.DISCONNECT, () => {
        console.log('Client disconnected');
      });
    });
  }
}

export default SocketIOWebSocketProvider;
