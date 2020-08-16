import Router from 'koa-router';
import { verify } from '../repositories/AuthenticationMapper';

const router = new Router();

router.use('/', async (ctx, next) => {
    const decoded = verify(ctx.request);
    ctx.state.token = decoded;
    return await next();
});

export default router.routes();
