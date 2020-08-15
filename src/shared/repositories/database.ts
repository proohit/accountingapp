import { createTable as createRecordTable } from '../../record/repositories/RecordMapper';
import { createIndices as createRecordIndices } from '../../record/repositories/RecordMapper';
import { createAutoIncrement as createRecordAutoIncrement } from '../../record/repositories/RecordMapper';
import { createConstraints as createRecordConstraints } from '../../record/repositories/RecordMapper';
import { createTable as createUserTable } from '../../user/repositories/UserMapper';
import { createIndices as createUserIndices } from '../../user/repositories/UserMapper';
import { createTable as createWalletTable } from '../../wallet/repositories/WalletMapper';
import { createIndices as createWalletIndices } from '../../wallet/repositories/WalletMapper';
import { createConstraints as createWalletConstraints } from '../../wallet/repositories/WalletMapper';
import crypto from 'crypto-js';
import AES from 'crypto-js/aes';
import jwt from 'jsonwebtoken';
import Koa from 'koa';
import mysql, { RowDataPacket } from 'mysql2';
import User from '../../user/models/User';
import config from '../../../config';

export const con = mysql
    .createConnection({
        host: config.host,
        port: 3306,
        user: config.user,
        password: config.password,
        database: config.database,
    })
    .promise();

export const initiateDatabase = async () => {
    await createRecordTable();
    await createUserTable();
    await createWalletTable();
    await createUserIndices();
    await createRecordIndices();
    await createWalletIndices();
    await createRecordAutoIncrement();
    await createRecordConstraints();
    await createWalletConstraints();
};

export const useDatabase = async (databaseName: string) => {
    try {
        const res = await con.query(`USE DATABASE ${databaseName};`);
    } catch (error) {}
};

export const register = async (username: string, password: string) => {
    try {
        var private_key = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 32; i++) {
            private_key += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const hashedPassword = crypto.enc.Utf8.parse(password);
        let passwordEncrypted = AES.encrypt(hashedPassword, private_key).toString();
        await con.query(
            `INSERT INTO User(username, password, private_key) VALUES('${username}','${passwordEncrypted}','${private_key}')`,
        );
        const res = await con.query(`SELECT * from User WHERE username='${username}'`);
        return res;
    } catch (error) {
        throw new Error(error);
    }
};

export const login = async (req: Koa.Request) => {
    let username = req.body.username;
    let password = req.body.password;
    try {
        if (!username || !password) {
            throw new Error('Incorrect username or password');
        }
        const res = (await con.query(`SELECT * FROM User WHERE username='${username}'`)) as any;
        const users = res[0] as User[];
        if (users.length <= 0 || !users) {
            throw new Error('Incorrect username or password');
        }
        const pk = users[0].private_key;
        const pw = users[0].password;
        let passwordDecrypted = AES.decrypt(users[0].password, users[0].private_key);
        passwordDecrypted = crypto.enc.Utf8.stringify(passwordDecrypted);

        if (username === users[0].username && password === passwordDecrypted) {
            let token = jwt.sign({ username: username }, config.secret, {
                expiresIn: '7 days', // expires in 24 hours
            });
            // return the JWT token for the future API calls
            return {
                success: true,
                message: 'Authentication successful',
                token: token,
            };
        } else {
            throw new Error('Incorrect username or password');
        }
    } catch (error) {
        throw error;
    }
};

export const verify = async (req: Koa.Request) => {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (!token) {
            throw new Error('Token not provided');
        }
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        if (token) {
            try {
                const decoded = await jwt.verify(token, config.secret);
                return decoded;
            } catch (error) {
                throw new Error('Token is not valid');
            }
        } else {
            throw new Error('Token not provided');
        }
    } catch (error) {
        throw error;
    }
};

export const close = () => {
    con.end();
};
