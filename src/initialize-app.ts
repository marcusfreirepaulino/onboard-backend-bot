import 'dotenv/config.js';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source.js';
import { createUserUseCase } from './domain/user/create-user.use-case.js';
import { formatError } from './format-error.js';
import { loginUseCase } from './domain/auth/login.use-case.js';

const typeDefs = `
  type User {
    id: Int!
    name: String!
    email: String!
    birthDate: String!
  }

  type Login {
    login: User!
    token: String! 
  }

  input UserInput {
    name: String!
    email: String!
    birthDate: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
   
  type Query {
    hello: String
  }
  
  type Mutation {
    createUser(data: UserInput!): User!
  }
  
  type Mutation {
    login(data: LoginInput!): Login!
  }
`;

const resolvers = {
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

export async function initializeApp() {
  try {
    await AppDataSource.initialize();
    const server = new ApolloServer({ typeDefs, resolvers, formatError });

    const { url } = await startStandaloneServer(server, {
      listen: { port: +process.env.SERVER_PORT },
    });

    console.log(`Server Running at ${url}`);
  } catch (err) {
    console.log(err);
  }
}
