import { createReadStream } from 'fs';
import Router from '@koa/router';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.type = 'html';
    ctx.body = createReadStream('docs/index.html');
});

export default router.routes();
