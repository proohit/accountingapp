import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors';
import parser from 'koa-bodyparser';
import { createReadStream } from 'fs';
import config from '../config';

import * as database from './shared/repositories/database';

const app = new Koa();
const router = new Router({ prefix: '/api' });
import recordRouter from './record/services/recordRouter';
import walletRouter from './wallet/services/walletRouter';

app.use(parser());
app.use(cors());

router.use('/records', recordRouter);
router.use('/wallets', walletRouter);

router.post('/register', async (ctx) => {
  try {
    const res = await database.register(
      ctx.request.body.username,
      ctx.request.body.password
    );
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
    const res = await database.login(ctx.request);
    ctx.response.status = 201;
    ctx.response.body = JSON.stringify(res);
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = JSON.stringify(error.message);
  }
});

router.get('/docs', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = createReadStream('docs/index.html');
});

app.use(router.allowedMethods({ throw: true }));
app.use(router.routes());
try {
  app.listen(config.backendPort);
  console.log(`running on port ${config.backendPort}`);
} catch (e) {
  console.log(e);
}
