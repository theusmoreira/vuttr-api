import 'reflect-metadata';
import 'dotenv/config';

import '@shared/infra/typeorm';
import '@shared/container';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(400).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = process.env.PORT || '3333';

app.listen(port, () => console.log(`🚀 Server started on port ${port}!`));
