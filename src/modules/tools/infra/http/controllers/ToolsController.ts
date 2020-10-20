import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateToolService from '@modules/tools/services/CreateToolService';
import ListUserToolsService from '@modules/tools/services/ListUserToolsService';
import DeleteToolService from '@modules/tools/services/DeleteToolService';
import ListUserToolsWithTagService from '@modules/tools/services/ListUserToolsWithTagService';

export default class ToolsController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { title, link, description, tags } = request.body;
      const createToolService = container.resolve(CreateToolService);

      const tool = await createToolService.execute({
        title,
        description,
        link,
        tags,
        user_id,
      });
      return response.status(201).json(classToClass(tool));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { tag } = request.query;
      const listToolsUser = container.resolve(ListUserToolsService);
      const listToolsforTagService = container.resolve(
        ListUserToolsWithTagService,
      );

      if (tag) {
        const tools = await listToolsforTagService.execute({
          user_id,
          tag: String(tag),
        });
        return response.json(classToClass(tools));
      }

      const tools = await listToolsUser.execute({ user_id });
      return response.json(classToClass(tools));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { id } = request.params;

      const deleteTool = container.resolve(DeleteToolService);

      await deleteTool.execute({
        user_id,
        id,
      });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
