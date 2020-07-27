import { container } from 'tsyringe';

import SocketIOWebSocketProvider from './implementations/SocketIOWebSocketProvider';

import IWebSocketProvider from './models/IWebSocketProvider';

const providers = {
  socketio: SocketIOWebSocketProvider,
};

container.registerSingleton<IWebSocketProvider>(
  'WebSocketProvider',
  providers.socketio
);

export default providers.socketio;
