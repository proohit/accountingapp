import { UserController } from '../models/UserController';
import { byName } from '../repositories/UserMapper';

const USER_CONTROLLER: UserController = {
    getCurrentUser: async (ctx) => {
        const {
            state: {
                token: { username },
            },
        } = ctx;

        const user = await byName(username);
        delete user['password'];
        delete user['private_key'];
        return { data: user, status: 200 };
    },
};

export default USER_CONTROLLER;
