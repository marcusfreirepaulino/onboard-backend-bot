import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';
import { UserInput } from '../model/user.model.js';
import { User } from '../data/db/index.js';

dotenv.config({ path: 'test.env' });
const { AppDataSource } = await import('../data-source.js');

interface SeedDatabaseParams {
  users?: {
    name?: string;
    email?: string;
    password?: string;
    birthDate?: string;
  }[];
}

export async function seedDatabase(params?: SeedDatabaseParams) {
  const start = performance.now();

  const userRepository = AppDataSource.getRepository(User);

  const numberOfUsers = params?.users?.length ?? DEFAULT_NUMBER_OF_USERS;

  for (let i = 0; i < numberOfUsers; i++) {
    const randomUser = createRandomUser();
    const user = Object.assign(randomUser, params?.users?.[i]);

    userRepository.save(user);
  }

  const end = performance.now();
  console.log(`Database seeded with ${numberOfUsers} users! Runtime: ${end - start}ms`);
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

const DEFAULT_NUMBER_OF_USERS = 50;

if (require.main === module) {
  await AppDataSource.initialize();

  await seedDatabase();
}
