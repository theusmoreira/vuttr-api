import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const authenticateService = new AuthenticateUserService();
      const { email, password } = request.body;

      const { user, token } = await authenticateService.execute({
        email,
        password,
      });

      return response.json({ user: classToClass(user), token });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
