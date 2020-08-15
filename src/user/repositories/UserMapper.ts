import { con } from '../../shared/repositories/database';
import FullUser, { User } from '../models/User';

export const byName = async (username: string): Promise<User> => {
    try {
        const [user] = await con.query<User[]>(`SELECT * FROM User WHERE username='${username}';`);
        if (user.length <= 0) {
            throw new Error('No user found by username');
        }
        return user[0];
    } catch (error) {
        console.log(`error at UserMapper byName:`);
        console.log(error);
    }
};

export const fullByName = async (username: string): Promise<FullUser> => {
    try {
        const [user] = await con.query<FullUser[]>(`SELECT * FROM User WHERE username='${username}';`);
        if (user.length <= 0) {
            throw new Error('No user found by username');
        }
        return user[0];
    } catch (error) {
        console.log(`error at UserMapper byName:`);
        console.log(error);
    }
};
export const createNewUser = async (username: string, password: string, private_key: string): Promise<User> => {
    try {
        await con.query(
            `INSERT INTO User(username, password, private_key) VALUES('${username}','${password}','${private_key}')`,
        );
        const newUser = await byName(username);
        return newUser;
    } catch (error) {}
};

export const createTable = async (): Promise<void> => {
    try {
        const sql = `CREATE TABLE \`User\` (
            \`username\` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY,
            \`password\` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            \`private_key\` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
        await con.query(sql);
    } catch (error) {}
};

export const createIndices = async (): Promise<void> => {
    try {
        const sql = `ALTER TABLE \`User\`
      ADD PRIMARY KEY (\`username\`);`;
        await con.query(sql);
    } catch (error) {}
};
