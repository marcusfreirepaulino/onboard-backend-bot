import dotenv from 'dotenv';

dotenv.config({ path: 'test.env' });
import { initializeApp } from '../src/initialize-app';
import { cleanDatabase } from '../src/clean-database';

before(async () => {
  await initializeApp();
});
afterEach(async () => {
  await cleanDatabase();
});

await import('./get-user.test');
await import('./create-user.test');
await import('./login.test');
await import('./get-users.test');
