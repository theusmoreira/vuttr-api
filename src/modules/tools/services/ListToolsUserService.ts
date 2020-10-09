import { getCustomRepository } from 'typeorm';
import Tool from '../database/entities/Tool';
import ToolRepository from '../repositories/ToolsRepository';

interface IRequest {
  user_id: string;
}

class ListToolsUserService {
  public async execute({ user_id }: IRequest): Promise<Tool[]> {
    const toolRepository = getCustomRepository(ToolRepository);

    const tools = await toolRepository.find({ where: { user_id } });

    return tools;
  }
}

export default ListToolsUserService;
