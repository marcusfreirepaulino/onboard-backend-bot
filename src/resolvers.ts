import { loginUseCase } from './domain/auth/login.use-case.js';
import { createUserUseCase } from './domain/user/create-user.use-case.js';
import { getUserUseCase } from './domain/user/get-user.use-case.js';
import { getUsersUseCase } from './domain/user/get-users.use-case.js';

export const resolvers = {
  Query: {
    user: async (_, { id }, context) => getUserUseCase(id, context?.token),
    users: async (_, { data }, context) => getUsersUseCase(context?.token, data.limit, data.offset),
  },
  Mutation: {
    createUser: async (_, { data }, context) => createUserUseCase(data, context?.token),
    login: async (_, { data }) => loginUseCase(data),
  },
};
