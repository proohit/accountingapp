import { Context, DefaultState } from 'koa';
import Router from '@koa/router';
import { NotLoggedIn } from '../models/Errors';

const router = new Router<DefaultState, Context>();

router.use('/', async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        return await next();
    } else {
        throw new NotLoggedIn();
    }
});

export default router.routes();
