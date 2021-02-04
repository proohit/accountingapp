import { AuthenticationController } from '../models/AuthenticationController';
import { login, register } from '../repositories/authenticationMapper';

const AuthenticationControllerImpl: AuthenticationController = {
    login: async (ctx) => {
        const res = await login(ctx.request);
        return { status: 201, data: res };
    },
    register: async (ctx) => {
        const res = await register(ctx.request.body.username, ctx.request.body.password);
        return { status: 201, data: res };
    },
};

export default AuthenticationControllerImpl;
