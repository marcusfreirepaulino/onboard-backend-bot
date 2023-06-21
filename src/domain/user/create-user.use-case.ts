import { AppDataSource } from '../../data-source';
import { User } from '../../data/db/entity/user.entity.js';
import { UserModel } from '../../model';

export async function createUserRow(data: UserModel) {
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();
  user.id = 1;
  user.name = data.name;
  user.email = data.email;
  user.birthDate = data.birthDate;
  user.password = data.password;

  await userRepository.save(user);
}
