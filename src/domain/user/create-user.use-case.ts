import bcrypt from 'bcrypt';

import { AppDataSource } from '../../data-source';
import { User } from '../../data/db/entity/user.entity';
import { emailValidator, passwordValidator } from '../../data/validators/validators';
import { UserInput } from '../../model/user.model';
import { CustomError } from '../../format-error';
import { authorizeToken } from '../../auth/authorize-token';

export class CreateUserUseCase {
  private readonly repository = AppDataSource.getRepository(User);
  private readonly user = new User();

  async execute(input: UserInput, token: string) {
    authorizeToken(token);
    emailValidator(input.email);
    passwordValidator(input.password);

    const findEmail = this.repository.findOneBy({ email: input.email });

    if (!!findEmail) {
      throw new CustomError('This email is already registered.', 400);
    }

    const hashedPassword = await bcrypt.hash(input.password, +process.env.HASH_ROUNDS);

    this.user.name = input.name;
    this.user.email = input.email;
    this.user.birthDate = input.birthDate;
    this.user.password = hashedPassword;

    return this.repository.save(this.user);
  }
}