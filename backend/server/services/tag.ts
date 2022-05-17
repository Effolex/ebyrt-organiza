import { prisma } from '../client';
import { IUser, IUserReq } from '../interfaces/IUser';
import { compare, } from 'bcryptjs';
import { hashSync } from 'bcryptjs';
import TupleResponse from '../interfaces/IResponse';
import ITaskReq from '../interfaces/ITaskReq';


export default class TaskService {

  public getAll = async (): Promise<TupleResponse> => {
    try {
      const tag = await prisma.tag.findMany();
      return [200, tag];
    } catch (error) {
      throw error;
    }
  }
}