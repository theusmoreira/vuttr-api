import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';
import CreateUserService from '../services/CreateUserService';

export default class UsersControllers {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      return response.status(201).json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
