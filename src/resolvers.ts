import { loginUseCase } from './domain/auth/login.use-case.js';
import { createUserUseCase } from './domain/user/create-user.use-case.js';

export const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
  Mutation: {
    createUser: async (_, { data }) => {
      const userData = await createUserUseCase(data);

      return { ...userData };
    },
    login: async (_, { data }) => {
      const reponse = await loginUseCase(data);

      return reponse;
    },
  },
};
