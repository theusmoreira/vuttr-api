import { getCustomRepository } from 'typeorm';
import Tool from '../database/entities/Tool';
import ToolRepository from '../repositories/ToolsRepository';

interface IRequest {
  title: string;
  link: string;
  description: string;
  tags: Array<string>;
}

class CreateToolService {
  public async execute({
    title,
    description,
    link,
    tags,
  }: IRequest): Promise<Tool> {
    const toolRepository = getCustomRepository(ToolRepository);
    const tool = await toolRepository.createTool({
      title,
      description,
      link,
      tags,
    });

    return tool;
  }
}

export default CreateToolService;
