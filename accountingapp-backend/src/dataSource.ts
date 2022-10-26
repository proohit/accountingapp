import { DataSource } from 'typeorm';
import ormconfig from '../ormconfig.json';

const dataSource = new DataSource({
  ...ormconfig,
  type: 'mysql',
});

export default dataSource;
