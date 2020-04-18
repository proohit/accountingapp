import { initiateDatabase } from './../src/database/database';

const createDB = async () => {
  await initiateDatabase();
  console.log('created');
  return;
};

createDB();
