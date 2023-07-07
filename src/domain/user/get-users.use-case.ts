import { Service } from 'typedi';
import { CustomError } from '../../format-error';
import { UserDataSource } from '../../data/db/source/user.data-source';

@Service()
export class GetUsersUseCase {
  constructor(private readonly dataSource: UserDataSource) {}

  async execute(limit = 10, offset = 0) {

    if (limit < 0) {
      throw new CustomError('The number of users returned should not be lower than 0.', 400);
    }
    if (offset < 0) {
      throw new CustomError('The offset should be greater than 0.', 400);
    }

    const [users, usersCount] = await this.dataSource.getListOfUsers(limit, offset);

    return {
      users: users,
      total: usersCount,
      after: offset + limit >= usersCount,
      before: offset > 0,
    };
  }
}
