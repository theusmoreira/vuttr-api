import { EntityRepository, Repository } from 'typeorm';
import Tool from '../database/entities/Tool';

interface ICreateToolDTO {
  title: string;
  link: string;
  description: string;
  tags: Array<string>;
  user_id: string;
}

@EntityRepository(Tool)
class ToolRepository extends Repository<Tool> {
  public async createTool(data: ICreateToolDTO): Promise<Tool> {
    const tool = this.create(data);

    await this.save(tool);

    return tool;
  }
}

export default ToolRepository;
