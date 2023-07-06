import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';

import { CustomError } from '../../format-error';
import { LoginInput } from '../../model/user.model';
import { UserDataSource } from '../../data/db/source/user.data-source';

interface LoginUseCaseResponse {
  login: {
    id: number;
    name: string;
    birthDate: string;
    email: string;
  };
  token: string;
}

@Service()
export class LoginUseCase {
  constructor(private readonly dataSource: UserDataSource) {}

  async execute(input: LoginInput): Promise<LoginUseCaseResponse> {
    const databaseUser = await this.dataSource.getOneUser({ email: input.email });

    if (!databaseUser) {
      throw new CustomError('Invalid credentials', 401);
    }

    const isSamePassword = await bcrypt.compare(input.password, databaseUser.password);

    if (!isSamePassword) {
      throw new CustomError('Invalid credentials', 401);
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
}
