import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import PasswordResetService from './PasswordResetService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let fakeHashProvider: FakeHashProvider;
let passwordReset: PasswordResetService;

describe('PasswordResetService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    passwordReset = new PasswordResetService(
      fakeUsersRepository,
      fakeUsersTokenRepository,
      fakeHashProvider
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userToken = await fakeUsersTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await passwordReset.execute({
      password: 'novasenha',
      token: userToken.token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('novasenha');
    expect(updatedUser?.password).toBe('novasenha');
  });

  it('should not be able to reset users password with non-existing token', async () => {
    await expect(
      passwordReset.execute({
        token: 'non-existing-token',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset users password with non-existing token', async () => {
    const userToken = await fakeUsersTokenRepository.generate(
      'non-existing-user'
    );
    await expect(
      passwordReset.execute({
        token: userToken.token,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password after 2 hours from token creation', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userToken = await fakeUsersTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      passwordReset.execute({
        password: 'novasenha',
        token: userToken.token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
