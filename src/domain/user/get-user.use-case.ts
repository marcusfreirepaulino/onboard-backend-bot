import { Service } from 'typedi';
import { CustomError } from '../../format-error';
import { UserDataSource } from '../../data/db/source/user.data-source';

@Service()
export class GetUserUseCase {
  constructor(private readonly dataSource: UserDataSource) {}

  async execute(id: number) {

    const user = await this.dataSource.getOneUser({ id });

    if (!user) {
      throw new CustomError('No user with the passed id was found.', 400);
    }

    return user;
  }
}
