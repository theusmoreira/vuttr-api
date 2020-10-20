import { celebrate, Joi, Segments } from 'celebrate';

const validateCreateUser = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export default validateCreateUser;
