import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import sessionsValidation from '../middleware/validation/sessionsValidation';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.use(sessionsValidation);

sessionsRouter.post('/', sessionsController.create);
export default sessionsRouter;
