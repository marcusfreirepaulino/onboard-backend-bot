import { LoginUseCase } from './domain/auth/login.use-case';
import { CreateUserUseCase } from './domain/user/create-user.use-case';
import { GetUserUseCase } from './domain/user/get-user.use-case';
import { GetUsersUseCase } from './domain/user/get-users.use-case';

export const resolvers = {
  Query: {
    user: async (_, { id }, context) => new GetUserUseCase().execute(id, context?.token),
    users: async (_, { data }, context) => new GetUsersUseCase().execute(context?.token, data.limit, data.offset),
  },
  Mutation: {
    createUser: async (_, { data }, context) => new CreateUserUseCase().execute(data, context?.token),
    login: async (_, { data }) => new LoginUseCase().execute(data),
  },
};
