import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors';
import parser from 'koa-bodyparser';
import config from '../config';

import recordRouter from './record/services/recordRouter';
import walletRouter from './wallet/services/walletRouter';
import authenticationRouter from './shared/services/authenticationRouter';
import documentationRouter from './shared/services/documentationRouter';

const app = new Koa();
const router = new Router({ prefix: '/api' });

app.use(parser());
app.use(cors());

router.use(async (ctx, next) => {
    try {
        ctx.type = 'application/json';
        await next();
    } catch (error) {
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = {
            message: error.message,
        };
    }
});
router.use('/records', recordRouter);
router.use('/wallets', walletRouter);
router.use('/auth', authenticationRouter);
router.use('/docs', documentationRouter);

app.use(router.allowedMethods({ throw: true }));
app.use(router.routes());

try {
    app.listen(config.backendPort);
    console.log(`running on port ${config.backendPort}`);
} catch (e) {
    console.log(e);
}
