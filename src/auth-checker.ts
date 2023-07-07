import { AuthChecker } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { CustomError } from './format-error';
import Container from 'typedi';
import { UserDataSource } from './data/db/source/user.data-source';

export interface ContextType {
  token?: string;
}

export const customAuthChecker: AuthChecker<ContextType> = async ({ root, args, context, info }, roles) => {
  try {
    const repository = Container.get(UserDataSource);
    const payload = jwt.verify(context?.token, process.env.JWT_SECRET);

    await repository.userExists({ email: payload.toString() });

    return true;
  } catch (err) {
    throw new CustomError('Authentication error. Please login to your account and try again.', 401);
  }
};
