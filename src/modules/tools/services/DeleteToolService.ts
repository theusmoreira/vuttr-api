import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ToolRepository from '../repositories/ToolsRepository';

interface IRequest {
  user_id: string;
  id: string;
}

class DeleteToolService {
  public async execute({ user_id, id }: IRequest): Promise<void> {
    const toolRepository = getCustomRepository(ToolRepository);

    const checkToolExits = await toolRepository.find({
      where: { user_id, id },
    });

    if (!checkToolExits.length) {
      throw new AppError('Tool not exits');
    }

    await toolRepository.delete({ user_id, id });
  }
}

export default DeleteToolService;
