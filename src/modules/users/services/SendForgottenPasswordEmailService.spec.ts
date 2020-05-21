// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgottenPasswordEmailService from './SendForgottenPasswordEmailService';

describe('SendForgottenPasswordEmail', () => {
  it('should be able to recovery the users password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    // Vamos espionar sobre o método sendMail do fakeMailProvider
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgottenPasswordEmail = new SendForgottenPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    // Para dispararmos o e-mail do usuário primeiro temos que criá-lo
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    // Ao disparar o service esperamos que algum e-mail seja enviado
    await sendForgottenPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    // E agora esperamos que a função do sendMail tenha sido chamada
    expect(sendMail).toHaveBeenCalled();
  });
});
