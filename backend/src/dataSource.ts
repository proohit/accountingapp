import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const dataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: 'mysql',
  synchronize: false,
  logging: false,
  migrationsRun: true,
  timezone: 'Z',
  entities: ['dist/**/entities/*{.ts,.js}'],
  migrations: ['dist/migration/*.js'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});

export default dataSource;
