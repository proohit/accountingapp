import Router from 'koa-router';
import { verify } from '../repositories/authenticationMapper';

const router = new Router();

router.use('/', async (ctx, next) => {
    const decoded = verify(ctx.request);
    ctx.state.token = decoded;
    await next();
});

export default router.routes();
