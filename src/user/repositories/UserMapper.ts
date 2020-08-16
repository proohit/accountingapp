import { pool } from '../../shared/repositories/database';
import { UserNotFound } from '../models/Errors';
import FullUser, { User } from '../models/User';

export const byName = async (username: string): Promise<User> => {
    const [users] = await pool.query<User[]>(`SELECT * FROM User WHERE username='${username}';`);
    if (users.length <= 0) throw new UserNotFound();
    return users[0];
};

export const fullByName = async (username: string): Promise<FullUser> => {
    const [users] = await pool.query<FullUser[]>(`SELECT * FROM User WHERE username='${username}';`);
    if (users.length <= 0) throw new UserNotFound();
    return users[0];
};
export const createNewUser = async (username: string, password: string, private_key: string): Promise<User> => {
    await pool.query(
        `INSERT INTO User(username, password, private_key) VALUES('${username}','${password}','${private_key}')`,
    );
    const newUser = await byName(username);
    return newUser;
};

export const createTable = async (): Promise<void> => {
    const sql = `CREATE TABLE \`User\` (
            \`username\` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY,
            \`password\` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            \`private_key\` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
    await pool.query(sql);
};

export const createIndices = async (): Promise<void> => {
    const sql = `ALTER TABLE \`User\`
      ADD PRIMARY KEY (\`username\`);`;
    await pool.query(sql);
};
