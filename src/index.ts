import 'reflect-metadata';
import 'dotenv/config.js';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source.js';

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

AppDataSource.initialize()
  .then(() => console.log('initialized'))
  .catch((error) => console.log(error));

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: +process.env.SERVER_PORT },
});
