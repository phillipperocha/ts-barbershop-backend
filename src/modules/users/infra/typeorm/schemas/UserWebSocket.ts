import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('user_websockets')
class UserWebSocket {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  recipient_id: string;

  @Column()
  websocket_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export default UserWebSocket;
