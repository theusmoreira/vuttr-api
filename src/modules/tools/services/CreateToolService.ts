import { injectable, inject } from 'tsyringe';
import Tool from '../infra/typeorm/entities/Tool';
import IToolRepository from '../repositories/IToolRepository';

interface IRequest {
  title: string;
  link: string;
  description: string;
  tags: Array<string>;
  user_id: string;
}

@injectable()
class CreateToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolRepository,
  ) {}

  public async execute({
    title,
    description,
    link,
    tags,
    user_id,
  }: IRequest): Promise<Tool> {
    const tool = await this.toolsRepository.create({
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
