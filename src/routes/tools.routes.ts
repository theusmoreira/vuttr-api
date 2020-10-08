import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateToolService from '../services/CreateToolService';
import ToolRepository from '../repositories/ToolsRepository';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const toolsRouter = Router();
toolsRouter.use(ensureAuthenticated);

toolsRouter.get('/', async (request: Request, response: Response) => {
  const toolRepository = getCustomRepository(ToolRepository);

  const tools = await toolRepository.find();

  return response.json(tools);
});

toolsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { title, link, description, tags } = request.body;
    const createToolService = new CreateToolService();

    const tool = await createToolService.execute({
      title,
      description,
      link,
      tags,
    });

    return response.status(201).json(tool);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
export default toolsRouter;
