import 'reflect-metadata';
import 'dotenv/config.js';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source.js';

const typeDefs = `
  type Query {
    hello: String
  }
  type User {
    id: Number!
    firstName: String!
    lastName: String!
    email: String!

  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

async function IntializeApp() {
  try {
    await AppDataSource.initialize();
    const server = new ApolloServer({ typeDefs, resolvers });

    const { url } = await startStandaloneServer(server, {
      listen: { port: +process.env.SERVER_PORT },
    });

    console.log(`Server Running at ${url}`)

  } catch (err) {
    console.log(err);
  }
}

IntializeApp();
