import { AppDataSource } from './data-source';

export async function cleanDatabase() {
  await AppDataSource.query('TRUNCATE TABLE "user" CASCADE;');
}
