import Joi = require('joi');

export const userCreateSchema = Joi.object({
  email: Joi.string().required().email()
    .message('The field email was not provided or was invalid'),
  name: Joi.string(),
  password: Joi.string().required().min(3)
    .message('The field password was not provided or was invalid'),
});

export const taskSchema = Joi.object({
  title: Joi.string().required().min(3)
    .message('The field title was not provided or was invalid'),

  status: Joi.string().required().min(5).valid('pendente','em andamento','pronto')
  .messages({
    'any.any': 'fudeu'
  }),

  description: Joi.string().required().min(3)
    .message('The field description was not provided or was invalid'),
  
  tags: Joi.array().items(Joi.string()).required()
});