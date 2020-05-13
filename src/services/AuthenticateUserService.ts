import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

// Começar importando o AppError
import AppError from '../errors/AppError';
// E trocaremos todos os lugares que chamamos Error por AppError

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      // E adicionaremos o código 401 que é pra não autorizado
      throw new AppError('User not found.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      // E adicionaremos o código 401 que é pra não autorizado
      throw new AppError('Incorrect password.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
