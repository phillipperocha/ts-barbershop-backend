import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

// Importando o AppError
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      // E aqui o código também será 401
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      uploadConfig.delete(user.avatar);
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
