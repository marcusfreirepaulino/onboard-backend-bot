import { Service } from 'typedi';
import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';

import { LoginUseCase } from './domain/auth/login.use-case';
import { CreateUserUseCase } from './domain/user/create-user.use-case';
import { GetUserUseCase } from './domain/user/get-user.use-case';
import { GetUsersUseCase } from './domain/user/get-users.use-case';
import { Login, LoginInput, User, UserInput, Users, UsersInput } from './types-def';

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
  @Authorized()
  async user(@Arg('id') id: number) {
    return this.getUserUseCase.execute(id);
  }

  @Query(() => Users, {
    description: 'Get a list of users.',
  })
  @Authorized()
  async users(@Arg('data') data: UsersInput) {
    return this.getUsersUseCase.execute(data?.limit, data?.offset);
  }

  @Mutation(() => User, {
    description: 'Create an user.',
  })
  @Authorized()
  async createUser(@Arg('data') data: UserInput) {
    return this.createUserUseCase.execute(data);
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
