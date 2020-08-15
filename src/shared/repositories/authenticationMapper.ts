import { createNewUser, fullByName } from '../../user/repositories/UserMapper';
import crypto from 'crypto-js';
import AES from 'crypto-js/aes';
import jwt from 'jsonwebtoken';
import Koa from 'koa';
import { User } from '../../user/models/User';
import config from '../../../config';

export const register = async (username: string, password: string) => {
    try {
        let private_key = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 32; i++) {
            private_key += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const hashedPassword = crypto.enc.Utf8.parse(password);
        const passwordEncrypted = AES.encrypt(hashedPassword, private_key).toString();
        const newUser: User = await createNewUser(username, passwordEncrypted, private_key);
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
};

export const login = async (req: Koa.Request) => {
    const requestedUsername = req.body.username;
    const requestedPassword = req.body.password;
    if (!requestedUsername || !requestedPassword) {
        throw new Error('Incorrect username or password');
    }
    try {
        const userToLogin = await fullByName(requestedUsername);
        if (!userToLogin) {
            throw new Error('Incorrect username or password');
        }
        const username = userToLogin.username;
        const privateKey = userToLogin.private_key;
        const password = userToLogin.password;

        let passwordDecrypted = AES.decrypt(password, privateKey);
        passwordDecrypted = crypto.enc.Utf8.stringify(passwordDecrypted);

        if (!(requestedUsername === username && requestedPassword === passwordDecrypted)) {
            throw new Error('Incorrect username or password');
        }
        const token = jwt.sign({ username: requestedUsername }, config.secret, {
            expiresIn: '7 days',
        });
        // return the JWT token for the future API calls
        return {
            token: token,
        };
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
