import { Router } from 'express';
import UsersControllers from '../controllers/UsersController';
import usersValidation from '../middleware/validation/usersValidation';

const usersRouter = Router();
const usersController = new UsersControllers();

usersRouter.use(usersValidation);
usersRouter.post('/', usersController.create);

export default usersRouter;
