import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AppDataSource } from '../../data-source';
import { User } from '../../data/db/entity/user.entity';
import { CustomError } from '../../format-error';
import { LoginInput } from '../../model/user.model';

interface LoginUseCaseResponse {
  login: {
    id: number;
    name: string;
    birthDate: string;
    email: string;
  };
  token: string;
}

export class LoginUseCase {
  private readonly repository = AppDataSource.getRepository(User);

  async execute(input: LoginInput): Promise<LoginUseCaseResponse> {
    const databaseUser = await this.repository.findOneBy({ email: input.email });

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
