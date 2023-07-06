import { authorizeToken } from '../../auth/authorize-token';
import { AppDataSource } from '../../data-source';
import { User } from '../../data/db/index';
import { CustomError } from '../../format-error';

export class GetUsersUseCase {
  private readonly repository = AppDataSource.getRepository(User);

  async execute(token: string, limit = 10, offset = 0) {
    authorizeToken(token);

    if (limit < 0) {
      throw new CustomError('The number of users returned should not be lower than 0.', 400);
    }
    if (offset < 0) {
      throw new CustomError('The offset should be greater than 0.', 400);
    }

    const [users, usersCount] = await this.repository.findAndCount({
      skip: offset,
      take: limit,
      order: { name: 'ASC' },
      relations: ['address'],
    });

    return {
      users: users,
      total: usersCount,
      after: offset + limit >= usersCount,
      before: offset > 0,
    };
  }
}
