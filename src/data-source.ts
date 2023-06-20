import { DataSource } from 'typeorm';

import { User } from './data/db/entity/user.entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://teste:password@localhost:5432/local',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
