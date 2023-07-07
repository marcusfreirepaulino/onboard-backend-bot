import { Service } from 'typedi';
import { AppDataSource } from '../../../data-source';
import { User } from '../entity/user.entity';
import { UserInput } from '../../../model';

interface GetOneUserParams {
  id?: number;
  email?: string;
}

@Service()
export class UserDataSource {
  private readonly repository = AppDataSource.getRepository(User);

  async getOneUser(params: GetOneUserParams) {
    return this.repository.findOne({ where: { ...params }, relations: ['address'] });
  }

  async getListOfUsers(limit: number, offset: number) {
    return this.repository.findAndCount({ skip: offset, take: limit, order: { name: 'ASC' }, relations: ['address'] });
  }

  async createUser(input: UserInput) {
    return this.repository.save(input);
  }

  async userExists(params: GetOneUserParams) {
    return this.repository.findOneOrFail({ where: { ...params }, relations: ['address'] });
  }
}
