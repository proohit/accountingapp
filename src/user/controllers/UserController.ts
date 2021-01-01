import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { repositories } from '../../shared/repositories/database';
import { UserController } from '../models/UserController';

const USER_CONTROLLER: UserController = {
    getCurrentUser: async (ctx) => {
        const { username } = ctx.state.token;

        const user = await repositories.users().findOne(username);
        return { data: { username: user.username }, status: 200 };
    },
};

export default USER_CONTROLLER;
