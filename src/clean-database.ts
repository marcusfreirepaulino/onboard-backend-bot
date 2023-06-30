import { AppDataSource } from './data-source.js';

export async function cleanDatabase() {
  await AppDataSource.query('TRUNCATE TABLE "user" CASCADE;');
}
