import { celebrate, Joi, Segments } from 'celebrate';

const sessionsValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export default sessionsValidation;
