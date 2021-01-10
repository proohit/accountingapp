import { services } from '../../shared/services/services';
import { UserController } from '../models/UserController';

const USER_CONTROLLER: UserController = {
    getCurrentUser: async (ctx) => {
        const { username } = ctx.state.token;

        const user = await services.userService.getByUsername(username);
        return { data: { username: user.username }, status: 200 };
    },
};

export default USER_CONTROLLER;
