import bcrypt from 'bcrypt';
import { Service } from 'typedi';

import { User } from '../../data/db/entity/user.entity';
import { emailValidator, passwordValidator } from '../../data/validators/validators';
import { UserInput } from '../../model/user.model';
import { CustomError } from '../../format-error';
import { authorizeToken } from '../../auth/authorize-token';
import { UserDataSource } from '../../data/db/source/user.data-source';

@Service()
export class CreateUserUseCase {
  constructor(private readonly dataSource: UserDataSource) {}

  async execute(input: UserInput, token: string) {
    authorizeToken(token);
    emailValidator(input.email);
    passwordValidator(input.password);

    const findEmail = await this.dataSource.getOneUser({ email: input.email });

    if (!!findEmail) {
      throw new CustomError('This email is already registered.', 400);
    }

    const hashedPassword = await bcrypt.hash(input.password, +process.env.HASH_ROUNDS);

    const user = new User();

    user.name = input.name;
    user.email = input.email;
    user.birthDate = input.birthDate;
    user.password = hashedPassword;

    return this.dataSource.createUser(user);
  }
}
