import { AuthenticationController } from '../models/AuthenticationController';
import { register } from '../repositories/authenticationMapper';
import passport from 'koa-passport';
import { InvalidCredentials } from '../models/Errors';

const AuthenticationControllerImpl: AuthenticationController = {
    login: async (ctx, next) => {
        return passport.authenticate('local', (err, user, info) => {
            if (err) {
                throw err;
            }
            if (!user && info) {
                throw new InvalidCredentials();
            }
            if (user) {
                ctx.body = { username: user.username };
                ctx.status = 200;
                return ctx.login(user.username);
            }
        })(ctx, next);
    },
    register: async (ctx) => {
        const { username, password, email } = ctx.request.body;
        const res = await register(username, password, email);
        await ctx.login(res.username);
        return { status: 201, data: res };
    },
    logout: async (ctx) => {
        ctx.logout();
        return { status: 200, data: { message: 'Logout Successful' } };
    },
};

export default AuthenticationControllerImpl;
