import { RequestHandler } from 'express';
import TaskService from '../services/task';
import { IUserReq } from '../interfaces/IUser';
import authentication from '../services/authentication';

export default class taskController {
  constructor(private service = new TaskService()) {
  }

  public create: RequestHandler = async (req, res, _next) => {
    const { title, status, description, tags } = req.body;
    const { email } = req.user as IUserReq;
    try {
      const [ statusResponse, body ] = await this.service.create({ title, status, description, tags}, email);

      return res.status(statusResponse).json(body);
    } catch (error) {
      
      return res.status(500).json({ error: 'Internal error' });
    }
  };

  public edit: RequestHandler = async (req, res, _next) => {
    const { title, status, description } = req.body;
    const { id } = req.params;
    const { email } = req.user as IUserReq;
    try {
      const [ statusReq, body ] = await this.service.edit({ id:+id, title, status, description }, email);
      
      return res.status(statusReq).json(body);
    } catch (error) {
      
      return res.status(500).json({ error: 'Internal error' });
    }
  };

  public delete: RequestHandler = async (req, res, _next) => {
    const { id } = req.params;
    const { email } = req.user as IUserReq;
    try {
      const [ statusReq, body ] = await this.service.delete(+id, email);
      
      return res.status(statusReq).json(body);
    } catch (error) {
      
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  public getAll: RequestHandler = async (_req, res, _next) => {
    try {
      const [ status, body ] = await this.service.getAll();
      return res.status(status).json(body);
    } catch (error) {
      return res.status(500).json({ error: 'Internal error' });
    }
  };
}