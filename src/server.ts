import 'reflect-metadata';
import './database';
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('🚀 Server started on port 3333!'));
