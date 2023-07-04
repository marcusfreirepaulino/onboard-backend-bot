import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { UserInput } from '../model/user.model.js';
import { User } from '../data/db/index.js';

dotenv.config({ path: 'test.env' });

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

  const { AppDataSource } = await import('../data-source.js');
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(User);

  const numberOfUsers = !!params?.users?.length ? params.users.length : DEFAULT_NUMBER_OF_USERS;

  for (let i = 0; i < numberOfUsers; i++) {
    const randomUser = createRandomUser();
    const user = {
      name: params?.users?.[i].name ?? randomUser.name,
      email: params?.users?.[i].email ?? randomUser.email,
      password: params?.users?.[i].password ?? randomUser.password,
      birthDate: params?.users?.[i].birthDate ?? randomUser.birthDate,
    };

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

await seedDatabase();
