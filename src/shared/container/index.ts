import { container } from 'tsyringe';

import '@modules/users/providers';

import ToolRepository from '@modules/tools/infra/typeorm/repositories/ToolsRepository';
import IToolRepository from '@modules/tools/repositories/IToolRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IToolRepository>('ToolsRepository', ToolRepository);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
