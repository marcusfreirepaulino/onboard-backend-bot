import jwt from 'jsonwebtoken';
import { CustomError } from '../format-error';

export function authorizeToken(token: string) {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new CustomError('Authentication error. Please login to your account and try again.', 401);
  }
}
