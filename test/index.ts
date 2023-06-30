import dotenv from 'dotenv';

dotenv.config({ path: 'test.env' });

before(async () => {
  const { initializeApp } = await import('../src/initialize-app.js');
  await initializeApp();
});
afterEach(async () => {
  const { cleanDatabase } = await import('../src/clean-database.js');
  await cleanDatabase();
});

await import('./hello-world.test.js');
await import('./create-user.test.js');
