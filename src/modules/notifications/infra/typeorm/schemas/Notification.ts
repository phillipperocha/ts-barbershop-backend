// Aqui vamos utilizar o id específico do mongo que se chama ObjectID
import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  // Conteúdo da notificação
  @Column()
  content: string;

  // Id do usuário para quem enviamos a notificação
  @Column('uuid')
  recipient_id: string;

  // Se foi lida ou não:
  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
