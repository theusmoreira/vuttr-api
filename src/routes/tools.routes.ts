import { Router, Request, Response } from 'express';

import { classToClass } from 'class-transformer';
import CreateToolService from '../services/CreateToolService';
import ListToolsUser from '../services/ListToolsUserService';
import ListToolsUserForTagService from '../services/ListToolsUserForTagService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import DeleteToolService from '../services/DeleteToolService';

const toolsRouter = Router();
toolsRouter.use(ensureAuthenticated);

toolsRouter.get('/', async (request: Request, response: Response) => {
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
});

toolsRouter.post('/', async (request: Request, response: Response) => {
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
});

toolsRouter.delete('/:id', async (request: Request, response: Response) => {
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
});
export default toolsRouter;
