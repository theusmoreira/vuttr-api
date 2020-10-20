import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ToolsController from '../controllers/ToolsController';
import {
  validateCreateTool,
  validateListToolsWithTag,
  validateDeleteTool,
} from '../middlewares/validation/toolsValidation';

const toolsRouter = Router();
toolsRouter.use(ensureAuthenticated);
const toolsController = new ToolsController();

toolsRouter.get('/', validateListToolsWithTag, toolsController.index);

toolsRouter.post('/', validateCreateTool, toolsController.create);

toolsRouter.delete('/:id', validateDeleteTool, toolsController.delete);

export default toolsRouter;
