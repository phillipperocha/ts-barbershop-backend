import { injectable, inject } from 'tsyringe';
// Importaremos o path para passar o caminho pro arquivo
import path from 'path';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendForgottenPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('user does not exists');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    // E vamos passar
    const forgottenPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Barbershop] Password Recovery',
      templateData: {
        // Passaremos um file agora
        file: forgottenPasswordTemplate,
        variables: {
          name: user.name,
          token,
          // E precisamos passar o link, que será do frontend
          link: `${process.env.FRONT_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgottenPasswordEmailService;
