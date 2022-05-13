import Joi = require('joi');

export const userCreateSchema = Joi.object({
  email: Joi.string().required().email()
    .message('The field email was not provided or was invalid'),
  name: Joi.string(),
  password: Joi.string().required().min(3)
    .message('The field password was not provided or was invalid'),
});

export const taskSchema = Joi.object({
  title: Joi.string().required(),
  status: Joi.string().required(),
  description: Joi.string().required(),
});