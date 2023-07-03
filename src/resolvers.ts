import { loginUseCase } from './domain/auth/login.use-case.js';
import { createUserUseCase } from './domain/user/create-user.use-case.js';

export const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
  Mutation: {
    createUser: async (_, { data }, context) => createUserUseCase(data, context?.token),
    login: async (_, { data }) => loginUseCase(data),
  },
};
