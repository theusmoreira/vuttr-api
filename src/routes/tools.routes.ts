import { Router, Request, Response } from 'express';

import CreateToolService from '../services/CreateToolService';
import ListToolsUser from '../services/ListToolsUser';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const toolsRouter = Router();
toolsRouter.use(ensureAuthenticated);

toolsRouter.get('/', async (request: Request, response: Response) => {
  const user_id = request.user.id;
  const listTools = new ListToolsUser();

  const tools = await listTools.execute({ user_id });
  return response.json(tools);
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
    delete tool.user_id;
    return response.status(201).json(tool);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
export default toolsRouter;
