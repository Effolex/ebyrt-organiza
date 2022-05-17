import { RequestHandler } from 'express';
import TagService from '../services/tag';
import { IUserReq } from '../interfaces/IUser';
import authentication from '../services/authentication';

export default class tagController {
  constructor(private service = new TagService()) {
  }

  public getAll: RequestHandler = async (_req, res, _next) => {
    try {
      const [ status, body ] = await this.service.getAll();
      return res.status(status).json(body);
    } catch (error) {
      return res.status(500).json({ error: 'Internal error' });
    }
  };

  public byUser: RequestHandler = async (_req, res, _next) => {
    try {
      const [ status, body ] = await this.service.getAll();
      return res.status(status).json(body);
    } catch (error) {
      return res.status(500).json({ error: 'Internal error' });
    }
  };
}