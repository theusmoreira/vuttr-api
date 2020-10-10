import { getCustomRepository } from 'typeorm';
import Tool from '../infra/typeorm/entities/Tool';
import ToolRepository from '../repositories/ToolsRepository';

interface IRequest {
  title: string;
  link: string;
  description: string;
  tags: Array<string>;
  user_id: string;
}

class CreateToolService {
  public async execute({
    title,
    description,
    link,
    tags,
    user_id,
  }: IRequest): Promise<Tool> {
    const toolRepository = getCustomRepository(ToolRepository);
    const tool = await toolRepository.createTool({
      title,
      description,
      link,
      tags,
      user_id,
    });

    return tool;
  }
}

export default CreateToolService;
