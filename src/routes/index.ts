import { Router } from 'express';
import toolsRouter from './tools.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/tools', toolsRouter);
routes.use('/users', usersRouter);

export default routes;
