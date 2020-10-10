import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ToolsController from '../controllers/ToolsController';

const toolsRouter = Router();
toolsRouter.use(ensureAuthenticated);
const toolsController = new ToolsController();

toolsRouter.get('/', toolsController.index);

toolsRouter.post('/', toolsController.create);

toolsRouter.delete('/:id', toolsController.delete);

export default toolsRouter;
