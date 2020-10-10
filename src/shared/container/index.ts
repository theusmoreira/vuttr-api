import { container } from 'tsyringe';
import ToolRepository from '@modules/tools/infra/typeorm/repositories/ToolsRepository';
import IToolRepository from '@modules/tools/repositories/IToolRepository';

container.registerSingleton<IToolRepository>('ToolsRepository', ToolRepository);
