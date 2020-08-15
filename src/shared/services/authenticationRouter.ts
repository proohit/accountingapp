import * as register from '../repositories/authenticationMapper';
import Router from 'koa-router';

const router = new Router();

router.post('/register', async (ctx) => {
    try {
        const res = await register.register(ctx.request.body.username, ctx.request.body.password);
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res);
    } catch (error) {
        console.log(error);
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error);
    }
});
router.post('/login', async (ctx) => {
    try {
        const res = await register.login(ctx.request);
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res);
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error.message);
    }
});

export default router.routes();
