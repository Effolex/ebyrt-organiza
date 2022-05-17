import { RequestHandler } from 'express';
import { IUserReq } from '../interfaces/IUser';
import authentication from '../services/authentication';
import UserService from '../services/user';

export default class UserController {
  constructor(private userService = new UserService()) {
  }

  public create: RequestHandler = async (req, res, _next) => {
    const { email, name, password } = req.body;
    try {
      const [ status, body ] = await this.userService.create({email, name, password});

      return res.status(status).json(body);
    } catch (error) {
      
      return res.status(500).json({ error: 'Internal error' });
    }
  };

  public editName: RequestHandler = async (req, res, _next) => {
    const { name } = req.body;
    const { email } = req.user as IUserReq;
    try {
      const [ status, body ] = await this.userService.editName(name, email);
      
      return res.status(status).json(body);
    } catch (error) {
      
      return res.status(500).json({ error: 'Internal error' });
    }
  };

  public login: RequestHandler = async (req, res, _next) => {
    const { email, password } = req.body;
    try {
      const userRetrieved = await this.userService.login({ email, password });

      if (typeof userRetrieved === 'undefined') {
        return res.status(401).json({ error: 'The email or password provided was incorrect' });
      }

      const token = authentication.generateToken(userRetrieved);
      const { password: pass, ...userWithoutPass } = userRetrieved;

      return res.status(200).json({ user: userWithoutPass, token });
    } catch (error) {
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  public getAll: RequestHandler = async (_req, res, _next) => {
    try {
      const user = await this.userService.getAll();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal error' });
    }
  };
}