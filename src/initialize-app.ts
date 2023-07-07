import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source';
import { formatError } from './format-error';
import { AuthResolver, UsersResolver } from './resolvers';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

export async function initializeApp() {
  try {
    await AppDataSource.initialize();

    const schema = await buildSchema({ resolvers: [AuthResolver, UsersResolver], container: Container });

    const server = new ApolloServer({ schema, formatError });

    const { url } = await startStandaloneServer(server, {
      listen: { port: +process.env.SERVER_PORT },
      context: async ({ req }) => ({ token: req.headers?.authorization }),
    });

    console.log(`Server Running at ${url}`);
  } catch (err) {
    console.log(err);
  }
}
