import { getCustomRepository } from 'typeorm';
import Tool from '../infra/typeorm/entities/Tool';
import ToolRepository from '../repositories/ToolsRepository';

interface IRequest {
  tag: string;
  user_id: string;
}

class ListToolsUserService {
  public async execute({ user_id, tag }: IRequest): Promise<Tool[]> {
    const toolRepository = getCustomRepository(ToolRepository);

    const tools = await toolRepository.find({ where: { user_id } });

    const findToolsforTag = tools.filter(tool => tool.tags.includes(tag));

    return findToolsforTag;
  }
}

export default ListToolsUserService;
