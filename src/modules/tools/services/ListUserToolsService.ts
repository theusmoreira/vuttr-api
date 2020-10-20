import { injectable, inject } from 'tsyringe';
import Tool from '../infra/typeorm/entities/Tool';
import IToolRepository from '../repositories/IToolRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserTools {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Tool[]> {
    const tools = await this.toolsRepository.findToolsByUserId(user_id);

    return tools;
  }
}

export default ListUserTools;
