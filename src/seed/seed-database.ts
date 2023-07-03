import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import { UserInput } from '../model/user.model.js';

dotenv.config({ path: 'test.env' });

export async function seedDatabase() {
  const start = performance.now();

  const { AppDataSource } = await import('../data-source.js');
  const { createUserUseCase } = await import('../domain/user/create-user.use-case.js');
  await AppDataSource.initialize();

  for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
    const user = createRandomUser();
    const token = jwt.sign(user.email, process.env.JWT_SECRET);

    await createUserUseCase(user, token);
  }

  const end = performance.now();
  console.log(`Database seeded with ${NUMBER_OF_ITERATIONS} users! Runtime: ${end - start}ms`);
}

function createRandomUser(): UserInput {
  const randomNumber = Math.floor(Math.random() * 100).toString();
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password().concat(randomNumber),
    birthDate: faker.date.birthdate().toDateString(),
  };
}

const NUMBER_OF_ITERATIONS = 50;

await seedDatabase();
