import { RequestHandler, Response } from 'express';
import { IUserReq } from '../interfaces/IUser';
import authentication from '../services/authentication';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUserReq
  }
}

const authenticate: RequestHandler = (req, res, next): Response | void => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token not found' });
  }
  const user = authentication.validateToken(authorization);

  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  req.user = user as IUserReq;
  return next();
};

export default authenticate;