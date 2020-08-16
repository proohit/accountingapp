import crypto from 'crypto-js';
import AES from 'crypto-js/aes';
import jwt from 'jsonwebtoken';
import { Request } from 'koa';
import config from '../../../config';
import { User } from '../../user/models/User';
import { createNewUser, fullByName } from '../../user/repositories/UserMapper';
import { InvalidCredentials, TokenInvalid, TokenNotProvided } from '../models/Errors';
import { DecodedToken, LoginToken } from '../models/Login';

export const register = async (username: string, password: string): Promise<User> => {
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
};

export const login = async (req: Request): Promise<LoginToken> => {
    const requestedUsername = req.body.username;
    const requestedPassword = req.body.password;
    if (!requestedUsername || !requestedPassword) throw new InvalidCredentials();

    const userToLogin = await fullByName(requestedUsername);
    if (!userToLogin) throw new InvalidCredentials();
    const username = userToLogin.username;
    const privateKey = userToLogin.private_key;
    const password = userToLogin.password;

    let passwordDecrypted = AES.decrypt(password, privateKey);
    passwordDecrypted = crypto.enc.Utf8.stringify(passwordDecrypted);

    if (!(requestedUsername === username && requestedPassword === passwordDecrypted)) throw new InvalidCredentials();

    const token = jwt.sign({ username: requestedUsername }, config.secret, {
        expiresIn: '7 days',
    });

    return { token };
};

export const verify = (req: Request): DecodedToken => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (!token) throw new TokenNotProvided();

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (!token) throw new TokenNotProvided();

    try {
        const decoded = jwt.verify(token, config.secret) as DecodedToken;
        return decoded;
    } catch (error) {
        throw new TokenInvalid();
    }
};
