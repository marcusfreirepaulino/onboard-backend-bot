import { authorizeToken } from '../../auth/authorize-token.js';
import { AppDataSource } from '../../data-source.js';
import { User } from '../../data/db/index.js';
import { CustomError } from '../../format-error.js';

export async function getUsersUseCase(token: string, limit?: number, offset?: number) {
  const userRepository = AppDataSource.getRepository(User);
  authorizeToken(token);

  if (limit < 0) {
    throw new CustomError('The number of users returned should not be lower than 0.', 400);
  }
  if (offset < 0) {
    throw new CustomError('The offset should be larger than 0.', 400);
  }

  const [users, usersCount] = await userRepository.findAndCount({
    skip: offset,
    take: limit ?? DEFAULT_NUMBER_OF_RETURN,
  });

  users.sort((a, b) => a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0));

  return {
    users: users,
    total: usersCount,
    after: users.length === limit,
    before: !!offset && offset > 0,
  };
}

const DEFAULT_NUMBER_OF_RETURN = 10;
