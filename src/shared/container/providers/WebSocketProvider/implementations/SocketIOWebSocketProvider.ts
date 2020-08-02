import { Application } from 'express';
import socketIo from 'socket.io';
import { createServer, Server } from 'http';

import Events from '@shared/container/providers/WebSocketProvider/enums/Events';
import { IChatMessage } from '@shared/container/providers/WebSocketProvider/dtos/IChatMessage';
import ensureAuthenticatedWebSocketMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticatedWebSocket';
import UserWebSocketsRepository from '@modules/users/infra/typeorm/repositories/UserWebSocketsRepository';

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
    return server;
  }

  public listen(io: SocketIO.Server): void {
    const userWebSocketsRepository = new UserWebSocketsRepository();

    io.on(Events.CONNECT, (socket: any) => {
      const socketID = socket.id;
      try {
        const userID = ensureAuthenticatedWebSocketMiddleware(socket);

        userWebSocketsRepository.create({
          websocket_id: socketID,
          recipient_id: userID,
        });
      } catch {
        console.log('Client disconnected by force');
        userWebSocketsRepository.delete(socketID);
      }

      socket.on(Events.MESSAGE, (m: IChatMessage) => {
        console.log('[server](message): %s', JSON.stringify(m));
        io.emit('message', m);
      });

      socket.on(Events.DISCONNECT, () => {
        userWebSocketsRepository.delete(socketID);
        console.log('Client disconnected');
      });
    });
  }
}

export default SocketIOWebSocketProvider;
