import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AppDataSource } from '../../data-source.js';
import { User } from '../../data/db/entity/user.entity.js';
import { CustomError } from '../../format-error.js';
import { LoginInput } from '../../model/user.model.js';

interface LoginUseCaseResponse {
  login: {
    id: number;
    name: string;
    birthDate: string;
    email: string;
  };
  token: string;
}

export async function loginUseCase(input: LoginInput): Promise<LoginUseCaseResponse> {
  const userRepository = AppDataSource.getRepository(User);

  const databaseUser = await userRepository.findOneBy({ email: input.email });

  if (!databaseUser) {
    throw new CustomError('There is no user registered using the email sent.', 400);
  }

  const isSamePassword = await bcrypt.compare(input.password, databaseUser.password);

  if (!isSamePassword) {
    throw new CustomError('Wrong password! Please, try again.', 400);
  }
  
  const token = jwt.sign(databaseUser.email, process.env.JWT_SECRET);

  return {
    login: {
      id: databaseUser.id,
      name: databaseUser.name,
      email: databaseUser.email,
      birthDate: databaseUser.birthDate,
    },
    token,
  };
}
