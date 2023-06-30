import { AppDataSource } from '../../data-source.js';
import { User } from '../../data/db/entity/user.entity.js';
import { emailValidator, passwordValidator } from '../../data/validators/validators.js';
import { LoginInput } from '../../model/user.model.js';

export async function loginUseCase(input: LoginInput) {
  const userRepository = AppDataSource.getRepository(User);
  emailValidator(input.email);
  passwordValidator(input.password);
  
  const findUserByEmail = userRepository.findOneBy({email: input.email});

  if(!findUserByEmail) {
    throw Custt
  }
}
