import 'reflect-metadata';
import 'dotenv/config.js';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { AppDataSource } from './data-source';
import { createUserUseCase } from './domain/';

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
    createUser: (_, { data }) => {
      return createUserUseCase(data);
    },
  },
};

async function IntializeApp() {
  try {
    await AppDataSource.initialize();
    const server = new ApolloServer({ typeDefs, resolvers });

    const { url } = await startStandaloneServer(server, {
      listen: { port: +process.env.SERVER_PORT },
    });

    console.log(`Server Running at ${url}`);
  } catch (err) {
    console.log(err);
  }
}

IntializeApp();
