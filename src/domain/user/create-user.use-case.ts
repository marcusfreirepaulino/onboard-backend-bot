import { AppDataSource } from '../../data-source';
import { User } from '../../data/db';
import { UserModel } from '../../model';

export async function createUserUseCase(data: UserModel) {
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();

  user.name = data.name;
  user.email = data.email;
  user.birthDate = data.birthDate;
  user.password = data.password;

  return userRepository.save(user);
}
