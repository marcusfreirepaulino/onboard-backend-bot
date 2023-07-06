import { authorizeToken } from '../../auth/authorize-token';
import { AppDataSource } from '../../data-source';
import { User } from '../../data/db/entity/user.entity';
import { CustomError } from '../../format-error';

export class GetUserUseCase {
  private readonly repository = AppDataSource.getRepository(User);

  async execute(id: number, token: string) {
    authorizeToken(token);

    const user = this.repository.findOneBy({ id });

    if (!user) {
      throw new CustomError('No user with the passed id was found.', 400);
    }

    return user;
  }
}
