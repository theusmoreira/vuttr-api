import { uuid } from 'uuidv4';

import IToolRepository from '@modules/tools/repositories/IToolRepository';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
import Tool from '@modules/tools/infra/typeorm/entities/Tool';

class FakeToolRepository implements IToolRepository {
  private tools: Tool[] = [];

  public async create({
    title,
    description,
    link,
    tags,
    user_id,
  }: ICreateToolDTO): Promise<Tool> {
    const tool = new Tool();

    Object.assign(tool, {
      id: uuid(),
      title,
      description,
      tags,
      link,
      user_id,
    });

    this.tools.push(tool);

    return tool;
  }

  public async findToolsByUserId(user_id: string): Promise<Tool[]> {
    const tools = this.tools.filter(tool => tool.user_id === user_id);

    return tools;
  }

  public async findToolByUserIdAndToolId(
    user_id: string,
    id: string,
  ): Promise<Tool | undefined> {
    const toolFind = this.tools
      .filter(toolFilter => toolFilter.user_id === user_id)
      .find(tool => tool.id === id);

    return toolFind;
  }

  public async deleteTool(user_id: string, id: string): Promise<void> {
    this.tools
      .filter(toolFilter => toolFilter.user_id === user_id)
      .filter(tool => tool.id !== id);
  }

  public async findToolsWithTag(user_id: string, tag: string): Promise<Tool[]> {
    const tools = this.tools
      .filter(toolFilter => toolFilter.user_id === user_id)
      .filter(tool => tool.tags.includes(tag));

    return tools;
  }
}

export default FakeToolRepository;
