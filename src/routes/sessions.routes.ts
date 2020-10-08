import { Router, Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const authenticateService = new AuthenticateUserService();
    const { email, password } = request.body;

    const { user, token } = await authenticateService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
export default sessionsRouter;
