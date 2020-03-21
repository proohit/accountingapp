import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors'
import parser from 'koa-bodyparser'
import config from '../config';

import database = require('./database/database');

const app = new Koa();
const router = new Router({ prefix: '/api' });
// const combinedRouter = require('./src/routes/router')
import recordRouter from './routes/records/recordRouter';
import walletRouter from './routes/wallets/walletRouter';

app.use(parser());
app.use(cors());

router.use('/records', recordRouter)
router.use('/wallets', walletRouter)


router.post('/register', async ctx => {
    try {
        ctx.req
        const res = await database.register(ctx.request.body.username, ctx.request.body.password)
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res);
    } catch (error) {
        console.log(error);
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error);
    }
})

router.post('/login', async ctx => {
    try {
        const res = await database.login(ctx.request)
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res);
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error.message);
    }
})


app.use(router.allowedMethods({ throw: true }));
app.use(router.routes())
try {
    app.listen(config.backendPort);
    console.log(`running on port ${config.backendPort}`);
} catch (e) {
    console.log(e);
}