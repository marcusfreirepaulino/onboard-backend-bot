import bcrypt from 'bcrypt';

import { AppDataSource } from '../../data-source.js';
import { User } from '../../data/db/entity/user.entity.js';
import { emailValidator, passwordValidator } from '../../data/validators/validators.js';
import { UserModel } from '../../model/user.model.js';
import { CustomError } from '../../format-error.js';

export async function createUserUseCase(input: UserModel) {
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();

  emailValidator(input.email);
  passwordValidator(input.password);
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
