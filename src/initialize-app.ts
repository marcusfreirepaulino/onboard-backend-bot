import 'dotenv/config.js';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source.js';
import { formatError } from './format-error.js';
import { resolvers } from './resolvers.js';
import { typeDefs } from './types-def.js';

export async function initializeApp() {
  try {
    await AppDataSource.initialize();
    const server = new ApolloServer({ typeDefs, resolvers, formatError });

    const { url } = await startStandaloneServer(server, {
      listen: { port: +process.env.SERVER_PORT },
      context: async ({ req }) => ({ token: req.headers?.authorization }),
    });

    console.log(`Server Running at ${url}`);
  } catch (err) {
    console.log(err);
  }
}
