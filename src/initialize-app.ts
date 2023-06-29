import 'dotenv/config.js'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source.js';
import { createUserUseCase } from './domain/user/create-user.use-case.js';
import { formatError } from './format-error.js';

const typeDefs = `
  type User {
    id: Int!
    name: String!
    email: String!
    birthDate: String!
  }

  input UserInput {
    name: String!
    email: String!
    birthDate: String!
    password: String!
  }
  
  type Query {
    hello: String
  }
  
  type Mutation {
    createUser(data: UserInput!): User!
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
