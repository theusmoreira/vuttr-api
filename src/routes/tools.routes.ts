import { Router, Request, Response } from 'express';

const toolsRouter = Router();

toolsRouter.post('/', (request: Request, response: Response) => {
  // const { title, link, description, tags } = request.body;

  console.log(request.body);
  return response.json({ message: 'Hello  World' });
});
export default toolsRouter;
