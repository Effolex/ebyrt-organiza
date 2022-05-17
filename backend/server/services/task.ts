import { prisma } from '../client';
import { IUser, IUserReq } from '../interfaces/IUser';
import { compare, } from 'bcryptjs';
import { hashSync } from 'bcryptjs';
import TupleResponse from '../interfaces/IResponse';
import ITaskReq from '../interfaces/ITaskReq';


export default class TaskService {

  public create = async ( {title, status, description, tags }:ITaskReq, email: string ): Promise<TupleResponse> => {
    try {
      const isNotUnique = await prisma.task.findFirst({
        where: {
          title,
          author: {
            email
          }
        }
      });
      if (isNotUnique) {
      return [ 409, { error: 'Title must be unique!' }]
        
      }
      const task = await prisma.task.create({
        data: {
          title,
          status,
          description,
          author: {
            connect: {
              email: email,
            }
          },
        }
      })
      const tagPromises = (tags as string[]).map(async (tag) => {
        await prisma.tag.create({
          data: {
            name: tag,
            author: {
              connect: {
                email
              }
            },
            tasks:{
              connect: {
              id: task.id,
              }
            }
          }
        })
      })
      Promise.all(tagPromises);

      return [ 201, { data: task }]
    } catch (error) {
      return [ 500, { error: 'Internal Error' }]
    }
  }

  public delete = async (id: number, email: string): Promise<TupleResponse> => {
    try {
      const isFromUser = await prisma.task.findFirst({ where: { id, author: { email } }})
      if (!isFromUser) {
        return [401, { error: 'The task is not from the authenticated user '}];
      }
      await prisma.tag.deleteMany({
        where: {
          taskId: id
        }
      })
      const deleted = await prisma.task.delete({
        where: {
          id,
        }
      });
      console.log("🚀 ~ file: task.ts ~ line 74 ~ TaskService ~ publicdelete ~ deleted", deleted)
      return [200, deleted];
    } catch (error) {
      console.log("🚀 ~ file: task.ts ~ line 76 ~ TaskService ~ publicdelete ~ error", error)
      throw error;
    }
  }
  
  public getAll = async (): Promise<TupleResponse> => {
    try {
      const task = await prisma.task.findMany({
        include: {
          author: true,
          tags: true,
        }
      });
      return [200, task];
    } catch (error) {
      throw error;
    }
  }

  public edit = async ({ id, title, status, description}:ITaskReq, email: string): Promise<TupleResponse> => {
    try {
      const exists = await prisma.task.findUnique({ where: { id }});
      if (!exists) {
        return [ 400, { message: 'Task does not exist' }];
      }

      const task = await prisma.task.update({
        where: { id },
        data: { title, status, description },
      });
      console.log("🚀 ~ file: user.ts ~ line 58 ~ UserService ~ editName= ~ users", task);
      return [ 201, { message: 'User successfully updated' }];
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