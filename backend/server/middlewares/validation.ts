import { RequestHandler } from 'express';
import { taskSchema, userCreateSchema } from './schemas';

const userReq: RequestHandler = (req, res, next) => {
  const { error } = userCreateSchema.validate(req.body, { convert: false });

  if (error) {
    const { message } = error.details[0];
    return res.status(401).json({ error: message });
  }
  return next();
};

const taskReq: RequestHandler = (req, res, next) => {
  const { error } = taskSchema.validate(req.body, { convert: false });

  if (error) {
    const { message } = error.details[0];
    return res.status(401).json({ error: message });
  }
  return next();
};

export default { taskReq, userReq };