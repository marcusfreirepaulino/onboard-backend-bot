import dotenv from 'dotenv';

dotenv.config({ path: 'test.env' });

before(async () => {
  const { initializeApp } = await import('../src/initialize-app');
  await initializeApp();
});
afterEach(async () => {
  const { cleanDatabase } = await import('../src/clean-database');
  await cleanDatabase();
});

await import('./get-user.test');
await import('./create-user.test');
await import('./login.test');
await import('./get-users.test');
