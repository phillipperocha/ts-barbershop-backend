import ICreateUserWebSocketDTO from '@modules/users/dtos/ICreateUserWebSocketDTO';

export default interface IUserWebSocketsRepository {
  create(data: ICreateUserWebSocketDTO): void;
  delete(websocket_id: string): void;
}
