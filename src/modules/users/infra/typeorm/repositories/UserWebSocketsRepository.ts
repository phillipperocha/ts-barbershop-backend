import { getMongoRepository, MongoRepository } from 'typeorm';

import IUserWebSocketsRepository from '@modules/users/repositories/IUserWebSocketsRepository';
import ICreateUserWebSocketDTO from '@modules/users/dtos/ICreateUserWebSocketDTO';

import UserWebSocket from '@modules/users/infra/typeorm/schemas/UserWebSocket';

class UserWebSocketsRepository implements IUserWebSocketsRepository {
  private ormRepository: MongoRepository<UserWebSocket>;

  constructor() {
    this.ormRepository = getMongoRepository(UserWebSocket, 'mongo');
  }

  public create({ websocket_id, recipient_id }: ICreateUserWebSocketDTO): void {
    const userWebSocket = this.ormRepository.create({
      websocket_id,
      recipient_id,
    });

    this.ormRepository.save(userWebSocket);
  }

  public delete(websocket_id: string): void {
    this.ormRepository.delete({
      websocket_id,
    });
  }
}

export default UserWebSocketsRepository;
