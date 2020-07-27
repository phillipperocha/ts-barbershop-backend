import { Application } from 'express';
import { Server } from 'http';

export default interface IWebSocketProvider {
  io: SocketIO.Server;
  initSocket(app: Application): Server;
}
