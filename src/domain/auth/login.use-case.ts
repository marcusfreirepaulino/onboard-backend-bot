import bcrypt from 'bcrypt';

import { AppDataSource } from '../../data-source.js';
import { User } from '../../data/db/entity/user.entity.js';
import { emailValidator, passwordValidator } from '../../data/validators/validators.js';
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
  emailValidator(input.email);
  passwordValidator(input.password);

  const databaseUser = await userRepository.findOneBy({ email: input.email });

  if (!databaseUser) {
    throw new CustomError('There is no user registered using the email sent.', 400);
  }

  const isSamePassword = await bcrypt.compare(input.password, databaseUser.password);

  if (!isSamePassword) {
    throw new CustomError('Wrong password! Please, try again.', 400);
  }

  return {
    login: {
      id: databaseUser.id,
      name: databaseUser.name,
      email: databaseUser.email,
      birthDate: databaseUser.birthDate,
    },
    token: '',
  };
}
