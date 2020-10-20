import { celebrate, Joi, Segments } from 'celebrate';

const validateCreateTool = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    link: Joi.string().uri(),
    tags: Joi.array().items(Joi.string()),
  }),
});

const validateListToolsWithTag = celebrate({
  [Segments.QUERY]: Joi.object({
    tag: Joi.string(),
  }),
});

const validateDeleteTool = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().uuid().required(),
  }),
});

export { validateCreateTool, validateListToolsWithTag, validateDeleteTool };
