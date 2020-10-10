import Tool from '../infra/typeorm/entities/Tool';
import ICreateToolDTO from '../dtos/ICreateToolDTO';

export default interface IToolRepository {
  create(data: ICreateToolDTO): Promise<Tool>;
  findToolsByUserId(user_id: string): Promise<Tool[]>;
  findToolByUserIdAndToolId(
    user_id: string,
    id: string,
  ): Promise<Tool | undefined>;
  findToolsWithTag(user_id: string, tag: string): Promise<Tool[]>;
  deleteTool(user_id: string, id: string): Promise<void>;
}
