import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IToolRepository from '../repositories/IToolRepository';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class DeleteToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<void> {
    const checkToolExits = await this.toolsRepository.findToolByUserIdAndToolId(
      user_id,
      id,
    );

    if (!checkToolExits) {
      throw new AppError('Tool not exits');
    }

    await this.toolsRepository.deleteTool(user_id, id);
  }
}

export default DeleteToolService;
