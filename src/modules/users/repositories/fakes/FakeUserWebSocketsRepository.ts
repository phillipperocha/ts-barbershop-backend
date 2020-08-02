import { ObjectID } from 'mongodb';

import IUserWebSocketsRepository from '@modules/users/repositories/IUserWebSocketsRepository';
import ICreateUserWebSocketDTO from '@modules/users/dtos/ICreateUserWebSocketDTO';

import UserWebSocket from '@modules/users/infra/typeorm/schemas/UserWebSocket';

class FakeUserWebSocketsRepository implements IUserWebSocketsRepository {
  private websockets: UserWebSocket[] = [];

  public create({ websocket_id, recipient_id }: ICreateUserWebSocketDTO): void {
    const websocket = new UserWebSocket();

    Object.assign(websocket, {
      id: new ObjectID(),
      websocket_id,
      recipient_id,
    });

    this.websockets.push(websocket);
  }

  public delete(websocket_id: string): void {
    this.websockets.filter(ws => ws.websocket_id !== websocket_id);
  }
}

export default FakeUserWebSocketsRepository;
