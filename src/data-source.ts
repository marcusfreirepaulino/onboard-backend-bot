import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mago',
  password: '12345',
  database: 'local',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});
