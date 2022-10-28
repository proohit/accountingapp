import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
const dataSource = new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrationsRun: true,
  timezone: 'Z',
  entities: ['dist/src/**/entities/*{.ts,.js}'],
  migrations: ['dist/src/migration/**/*{.ts,.js}'],
  subscribers: ['dist/src/subscriber/**/*{.ts,.js}'],
});

export default dataSource;
