import dotenv from 'dotenv';

dotenv.config({ path: 'test.env' });

before(async () => {
  const { initializeApp } = await import('../src/initialize-app.js');
  await initializeApp();
});

await import('./hello-world.test.js');
await import('./create-user.test.js');
