import bcrypt from 'bcrypt';

import { AppDataSource } from '../../data-source.js';
import { User } from '../../data/db/entity/user.entity.js';
import { emailValidator, passwordValidator } from '../../data/validators/validators.js';
import { UserInput } from '../../model/user.model.js';
import { CustomError } from '../../format-error.js';
import { authorizeToken } from '../../auth/authorize-token.js';

export class CreateUserUseCase {
  constructor(private readonly repository = AppDataSource.getRepository(User), private readonly user = new User()) {}

  async execute(input: UserInput, token: string) {
    emailValidator(input.email);
    passwordValidator(input.password);
    authorizeToken(token);

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

export async function createUserUseCase(input: UserInput, token: string) {
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();

  emailValidator(input.email);
  passwordValidator(input.password);
  authorizeToken(token);

  const findEmail = await userRepository.findOneBy({ email: input.email });

  if (!!findEmail) {
    throw new CustomError('This email is already registered.', 400);
  }

  const hashedPassword = await bcrypt.hash(input.password, +process.env.HASH_ROUNDS);

  user.name = input.name;
  user.email = input.email;
  user.birthDate = input.birthDate;
  user.password = hashedPassword;

  return userRepository.save(user);
}
