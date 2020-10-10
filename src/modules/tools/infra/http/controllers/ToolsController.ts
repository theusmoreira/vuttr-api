import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';

import CreateToolService from '@modules/tools/services/CreateToolService';
import ListToolsUser from '@modules/tools/services/ListToolsUserService';
import ListToolsUserForTagService from '@modules/tools/services/ListToolsUserForTagService';
import DeleteToolService from '@modules/tools/services/DeleteToolService';

export default class ToolsController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { title, link, description, tags } = request.body;
      const createToolService = new CreateToolService();

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
      const listTools = new ListToolsUser();
      const listToolsforTagService = new ListToolsUserForTagService();

      if (tag) {
        const tools = await listToolsforTagService.execute({
          user_id,
          tag: String(tag),
        });
        return response.json(classToClass(tools));
      }

      const tools = await listTools.execute({ user_id });
      return response.json(classToClass(tools));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { id } = request.params;

      const deleteTool = new DeleteToolService();

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
