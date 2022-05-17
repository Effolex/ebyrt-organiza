import { verify, sign } from 'jsonwebtoken';
import IJwtUserPayload from '../interfaces/IJwtUserPayload';
import { IUser, IUserReq } from '../interfaces/IUser';
const dotnev = require('dotenv');

dotnev.config();

const generateToken = (user: IUser) => {
  const secret = process.env.JWT_SECRET || 'development';
  const { password, id, ...userWithoutPassword } = user;
  const token = sign(userWithoutPassword, secret);

  return token;
};


const validateToken = (token: string) => {
  try {
    const secret = process.env.JWT_SECRET || 'development';
    
    const decodedPayload = verify(token, secret);
    return decodedPayload as IUserReq;
  } catch (error) {
    throw error;
  }
};

export default {
  generateToken,
  validateToken,
};