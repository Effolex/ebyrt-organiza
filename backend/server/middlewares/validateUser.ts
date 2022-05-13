import { RequestHandler } from 'express';
import { userCreateSchema } from './schemas';

export const validateUser: RequestHandler = (req, res, next) => {
  const { error } = userCreateSchema.validate(req.body, { convert: false });

  if (error) {
    const { message } = error.details[0];
    return res.status(401).json({ error: message });
  }
  return next();
};
