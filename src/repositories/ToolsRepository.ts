import { EntityRepository, Repository } from 'typeorm';
import Tool from '../models/Tool';

interface CreateToolDTO {
  title: string;
  link: string;
  description: string;
  tag: Array<string>;
}

@EntityRepository(Tool)
export default class ToolRepository extends Repository<Tool> {}
