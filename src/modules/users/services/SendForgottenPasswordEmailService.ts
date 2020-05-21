import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

// import User from '@modules/users/infra/typeorm/entities/User';

// vamos receber apenas e-mail
interface IRequest {
  email: string;
}

@injectable()
class SendForgottenPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    // Faremos a injeção de dependência que implementaremos depois
    @inject('IMailProvider')
    private mailProvider: IMailProvider
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido'
    );
  }
}

export default SendForgottenPasswordEmailService;
