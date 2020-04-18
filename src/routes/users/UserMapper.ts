import { con } from '../../database/database';

export const byName = async (username: string) => {
  try {
    const user = await con.query(
      `SELECT * FROM User WHERE username='${username}';`
    );
    return user;
  } catch (error) {
    console.log(`error at UserMapper byName:`);
    console.log(error);
  }
};

export const createTable = async () => {
  try {
    const sql = `CREATE TABLE \`User\` (
            \`username\` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY,
            \`password\` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            \`private_key\` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
    const res = await con.query(sql);
  } catch (error) {}
};

export const createIndices = async () => {
  try {
    const sql = `ALTER TABLE \`User\`
      ADD PRIMARY KEY (\`username\`);`;
    const res = await con.query(sql);
  } catch (error) {}
};
