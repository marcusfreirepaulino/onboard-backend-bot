import { Container } from 'typedi';
import { Service } from 'typedi';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';

import { LoginUseCase } from './domain/auth/login.use-case';
import { CreateUserUseCase } from './domain/user/create-user.use-case';
import { GetUserUseCase } from './domain/user/get-user.use-case';
import { GetUsersUseCase } from './domain/user/get-users.use-case';
import { Login, LoginInput, User, UserInput, Users, UsersInput } from './types-def';

interface Context {
  token?: string;
}

@Service()
@Resolver()
export class UsersResolver {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Query(() => User, {
    description: 'Get an user based on their id.',
  })
  async user(@Arg('id') id: number, @Ctx() context: Context) {
    return this.getUserUseCase.execute(id, context?.token);
  }

  @Query(() => Users, {
    description: 'Get a list of users.',
  })
  async users(@Arg('data') data: UsersInput, @Ctx() context: Context) {
    return this.getUsersUseCase.execute(context.token, data?.limit, data?.offset);
  }

  @Mutation(() => User, {
    description: 'Create an user.',
  })
  async createUser(@Arg('data') data: UserInput, @Ctx() context: Context) {
    return this.createUserUseCase.execute(data, context?.token);
  }
}

@Service()
@Resolver()
export class AuthResolver {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Mutation(() => Login, {
    description: 'Login to an account.',
  })
  async login(@Arg('data') data: LoginInput) {
    return this.loginUseCase.execute(data);
  }
}

export const resolvers = {
  Query: {
    user: async (_, { id }, context) => Container.get(GetUserUseCase).execute(id, context?.token),
    users: async (_, { data }, context) =>
      Container.get(GetUsersUseCase).execute(context?.token, data.limit, data.offset),
  },
  Mutation: {
    createUser: async (_, { data }, context) => Container.get(CreateUserUseCase).execute(data, context?.token),
    login: async (_, { data }) => Container.get(LoginUseCase).execute(data),
  },
};
