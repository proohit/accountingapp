import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { DuplicatedUser } from '../../user/models/Errors';
import { BadRequest, InvalidCredentials, MissingProperty } from '../models/Errors';
import { LoginToken } from '../models/Login';
import { sanitizePassword, sanitizeUsername } from '../services/AuthenticationSanitizer';
import {
    getEmailValidationError,
    getPasswordValidationError,
    getUsernameValidationError,
} from '../services/AuthenticationValidator';
import { services } from '../services/services';
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
        const sanitizedUsername = sanitizeUsername(username);
        const sanitizedPassword = sanitizePassword(password);
        const usernameError = getUsernameValidationError(sanitizedUsername);
        if (usernameError) {
            done(null, null, new BadRequest(usernameError));
        }
        const passwordError = getPasswordValidationError(sanitizedPassword);
        if (passwordError) {
            done(null, null, new BadRequest(passwordError));
        }
        const userToLogin = await repositories.users().findOne(sanitizedUsername);
        if (!userToLogin) {
            return done(null, false, new InvalidCredentials());
        }

        const privateKey = userToLogin.private_key;
        const dbPassword = userToLogin.password;

        const passwordDecryptedString = services.authenticationService.decodePassword(dbPassword, privateKey);

        if (sanitizedPassword === passwordDecryptedString) {
            return done(null, userToLogin);
        } else {
            return done(null, false, new InvalidCredentials());
        }
    }),
);
export const register = async (username: string, password: string, email: string): Promise<LoginToken> => {
    const missingProperties = [];
    if (!username) {
        missingProperties.push('username');
    }
    if (!password) {
        missingProperties.push('password');
    }
    if (!email) {
        missingProperties.push('email');
    }
    if (missingProperties.length) {
        throw new MissingProperty(missingProperties);
    }
    if (getUsernameValidationError(username)) {
        throw new BadRequest(getUsernameValidationError(username));
    }
    if (getPasswordValidationError(password)) {
        throw new BadRequest(getPasswordValidationError(password));
    }
    if (getEmailValidationError(email)) {
        throw new BadRequest(getEmailValidationError(email));
    }
    const existingUser = await repositories.users().findOne({ where: [{ email }, { username }] });
    if (existingUser) {
        throw new DuplicatedUser();
    }
    const { encryptedPassword, privateKey } = services.authenticationService.encodePassword(password);
    const newUser = await repositories
        .users()
        .save({ username, password: encryptedPassword, private_key: privateKey, email });
    return { username: newUser.username, email: newUser.email };
};
