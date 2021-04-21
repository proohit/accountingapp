import crypto from 'crypto-js';
import AES from 'crypto-js/aes';
import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { InvalidCredentials } from '../models/Errors';
import { LoginToken } from '../models/Login';
import { repositories } from './database';

passport.serializeUser((username, done) => {
    done(null, username);
});

passport.deserializeUser(async (username, done) => {
    const user = await repositories.users().findOne(username);
    done(null, { username: user.username });
});

passport.use(
    new LocalStrategy({}, async (username, password, done) => {
        const userToLogin = await repositories.users().findOne(username);

        if (!userToLogin) {
            return done(new InvalidCredentials());
        }

        const privateKey = userToLogin.private_key;
        const dbPassword = userToLogin.password;

        let passwordDecrypted = AES.decrypt(dbPassword, privateKey);
        passwordDecrypted = crypto.enc.Utf8.stringify(passwordDecrypted);

        if (password === passwordDecrypted) {
            return done(null, userToLogin);
        } else {
            return done(new InvalidCredentials());
        }
    }),
);
export const register = async (username: string, password: string, email: string): Promise<LoginToken> => {
    let private_key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 32; i++) {
        private_key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const hashedPassword = crypto.enc.Utf8.parse(password);
    const passwordEncrypted = AES.encrypt(hashedPassword, private_key).toString();
    const newUser = await repositories.users().save({ username, password: passwordEncrypted, private_key, email });
    return { username: newUser.username, email: newUser.email };
};
