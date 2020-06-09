import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// Importando o cache provider
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    // Injetando ele nas dependências
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ user_id }: IRequest): Promise<User[]> {
    // Vamos pegar o cache
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`
    );

    // Caso não tenha cache, vamos pegar no banco
    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      console.log('A query no banco foi realizada!');

      // Aqui pegamos a lista do cache da lista de usuários com exceção do atual
      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProvidersService;
