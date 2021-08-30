import { User } from '../../entity/User';
import { services } from '../../shared/services/services';
import { UserController } from '../models/UserController';

const USER_CONTROLLER: UserController = {
    getCurrentUser: async (ctx) => {
        const { username } = ctx.state.user;

        const user = await services.userService.getByUsername(username);
        const currentUser: User = { ...user };
        delete currentUser.private_key;
        delete currentUser.password;
        return { data: currentUser, status: 200 };
    },
    changePassword: async (ctx) => {
        const { username } = ctx.state.user;
        const { password, newPassword } = ctx.request.body;
        const message = await services.userService.changePasswordOfUser(username, password, newPassword);
        return { data: { message }, status: 200 };
    },
};

export default USER_CONTROLLER;
