import { Field, ID, ObjectType, InputType, Int} from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  birthDate: string;

  @Field()
  password: string;

  @Field(() => [Address], { nullable: true })
  address?: Address[];
}

@ObjectType()
export class Users {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  total: number;

  @Field()
  before: boolean;

  @Field()
  after: boolean;

  @Field(() => [Address], { nullable: true })
  address?: Address[];
}

@ObjectType()
export class Address {
  @Field(() => ID)
  id: number;

  @Field()
  zipCode: string;

  @Field()
  street: string;

  @Field()
  streetNumber: number;

  @Field({ nullable: true })
  complement?: string;

  @Field()
  neighborhood: string;

  @Field()
  city: string;

  @Field()
  state: string;
}

@ObjectType()
export class Login {
  @Field(() => User)
  login: User;

  @Field()
  token: string;
}

@InputType()
export class UserInput {
  @Field()
  name: string

  @Field()
  email: string;

  @Field()
  birthDate: string;

  @Field()
  password: string;
}

@InputType()
export class UsersInput {
  @Field( () => Int,{nullable: true})
  limit?: number;

  @Field(() => Int, {nullable: true})
  offset?: number;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
