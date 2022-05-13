import { verify, sign } from 'jsonwebtoken';
import IJwtUserPayload from 'server/interfaces/IJwtUserPayload';
import IUser from '../interfaces/IUser';
const dotnev = require('dotenv');

dotnev.config();

const generateToken = (user: IUser) => {
  const secret = process.env.JWT_SECRET || 'development';
  const { password, userWithoutPassword } = user;
  const token = sign({ userWithoutPassword }, secret);

  return token;
};


const validateToken = (token: string) => {
  try {
    const secret = process.env.JWT_SECRET || 'development';
    
    const decodedPayload = verify(token, secret);
    const { data } = decodedPayload as IJwtUserPayload;

    return data as IUser;
  } catch (error) {
    throw error;
  }
};

export default {
  generateToken,
  validateToken,
};