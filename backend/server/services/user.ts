import { prisma } from '../client';
import { IUser } from '../interfaces/IUser';
import { compare, } from 'bcryptjs';
import { hashSync } from 'bcryptjs';
import TupleResponse from '../interfaces/IResponse';


export default class UserService {
  private saltRounds = 10;



  public create = async ( {email, name, password }:IUser ): Promise<TupleResponse> => {
    try {
      
      const hash = hashSync(password, this.saltRounds);

      const emailAlreadyIn = await prisma.user.count({ where: { email }});
        
      if (emailAlreadyIn) {
        return [ 409, { error: 'The Email is already registered' } ];
      }

      await prisma.user.create({
        data: {
          email,
          name,
          password: hash,
        }
      })

      return [ 201, { message: 'User successfully created' }]

    } catch (error) {
      return [ 500, { error: 'Internal Error' }]
    }
  }
  
  public getAll = async () => {
    try {
      const users = await prisma.user.findMany({
        include: {
          tasks: true,
        }
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  public login = async ({ email, password }:IUser ): Promise<IUser | undefined> => {
    try {
      const userRetrieved = await prisma.user.findUnique({ where: { email } });
      if (!userRetrieved?.password) return undefined;

      const isValidPassword =  await compare(password, userRetrieved.password);
      if (!isValidPassword) return undefined;

      return (userRetrieved as IUser);

    } catch (error) {
      throw error;
    }
  }
}