import * as register from '../repositories/authenticationMapper';
import Router from 'koa-router';

const router = new Router();

router.post('/register', async (ctx) => {
    const res = await register.register(ctx.request.body.username, ctx.request.body.password);
    ctx.status = 201;
    ctx.body = JSON.stringify(res);
});
router.post('/login', async (ctx) => {
    const res = await register.login(ctx.request);
    ctx.status = 201;
    ctx.body = JSON.stringify(res);
});

export default router.routes();
