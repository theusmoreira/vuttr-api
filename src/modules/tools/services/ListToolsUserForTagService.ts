import { injectable, inject } from 'tsyringe';
import Tool from '../infra/typeorm/entities/Tool';
import IToolRepository from '../repositories/IToolRepository';

interface IRequest {
  tag: string;
  user_id: string;
}

@injectable()
class ListToolsUserForTagService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolRepository,
  ) {}

  public async execute({ user_id, tag }: IRequest): Promise<Tool[]> {
    const tools = await this.toolsRepository.findToolsWithTag(user_id, tag);

    return tools;
  }
}

export default ListToolsUserForTagService;
