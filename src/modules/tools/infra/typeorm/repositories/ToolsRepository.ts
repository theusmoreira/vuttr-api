import { getRepository, Repository } from 'typeorm';
import IToolRepository from '@modules/tools/repositories/IToolRepository';
import Tool from '@modules/tools/infra/typeorm/entities/Tool';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';

class ToolRepository implements IToolRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  public async create({
    title,
    description,
    link,
    tags,
    user_id,
  }: ICreateToolDTO): Promise<Tool> {
    const tool = this.ormRepository.create({
      title,
      description,
      link,
      tags,
      user_id,
    });

    await this.ormRepository.save(tool);

    return tool;
  }

  public async findToolsByUserId(user_id: string): Promise<Tool[]> {
    const tools = await this.ormRepository.find({ where: { user_id } });

    return tools;
  }

  public async findToolByUserIdAndToolId(
    user_id: string,
    id: string,
  ): Promise<Tool | undefined> {
    const tool = this.ormRepository.findOne({ where: { user_id, id } });

    return tool;
  }

  public async deleteTool(user_id: string, id: string): Promise<void> {
    await this.ormRepository.delete({ user_id, id });
  }

  public async findToolsWithTag(user_id: string, tag: string): Promise<Tool[]> {
    const tools = await this.ormRepository.find({
      where: { user_id },
    });

    const findToolsTag = tools.filter(tool => tool.tags.includes(tag));

    // .createQueryBuilder('tools')
    // .where('tools.user_id = :user_id', { user_id })
    // .where('tools.tags IN (:...tags)', {
    //   tags: [tag],
    // })
    // .getMany();

    return findToolsTag;
  }
}

export default ToolRepository;
