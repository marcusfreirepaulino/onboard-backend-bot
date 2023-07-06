import { DataSource } from 'typeorm';

import { User } from './data/db/entity/user.entity';
import { Address } from './data/db/entity/address.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Address],
  migrations: [],
  subscribers: [],
});
