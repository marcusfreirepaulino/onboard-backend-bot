import bcrypt from 'bcrypt';

import { AppDataSource } from '../../data-source';
import { User } from '../../data/db';
import { emailValidator, passwordValidator } from '../../data/validators';
import { UserModel } from '../../model';

export async function createUserUseCase(input: UserModel) {
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();

  emailValidator(input.email);
  passwordValidator(input.password);
  const findEmail = await userRepository.findOneBy({ email: input.email });

  if (!!findEmail) {
    throw new Error('This email is already registered.');
  }

  const hashedPassword = await bcrypt.hash(input.password, +process.env.HASH_ROUNDS);
  
  user.name = input.name;
  user.email = input.email;
  user.birthDate = input.birthDate;
  user.password = hashedPassword;

  return userRepository.save(user);
}
