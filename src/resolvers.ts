import { LoginUseCase, loginUseCase } from './domain/auth/login.use-case';
import { CreateUserUseCase, createUserUseCase } from './domain/user/create-user.use-case';
import { GetUserUseCase, getUserUseCase } from './domain/user/get-user.use-case';
import { getUsersUseCase } from './domain/user/get-users.use-case';

export class Resolvers {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}
  resolvers() {
    return {
      Query: {
        user: async (_, { id }, context) => this.getUserUseCase.execute(id, context?.token),
        users: async (_, { data }, context) => getUsersUseCase(context?.token, data.limit, data.offset),
      },
      Mutation: {
        createUser: async (_, { data }, context) => this.createUserUseCase.execute(data, context?.token),
        login: async (_, { data }) => this.loginUseCase.execute(data),
      },
    };
  }
}

export const resolvers = {
  Query: {
    user: async (_, { id }, context) => new GetUserUseCase().execute(id, context?.token),
    users: async (_, { data }, context) => getUsersUseCase(context?.token, data.limit, data.offset),
  },
  Mutation: {
    createUser: async (_, { data }, context) => createUserUseCase(data, context?.token),
    login: async (_, { data }) => loginUseCase(data),
  },
};
