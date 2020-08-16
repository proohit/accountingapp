import Router from 'koa-router';

import { verify } from '../../shared/repositories/authenticationMapper';
import { allByUser, createRecord, byId, byWallet, deleteRecord, update } from '../repositories/RecordMapper';
import { ResourceNotAllowed } from '../../shared/models/Errors';

const router = new Router();

router.use('/', async (ctx, next) => {
    const decoded = verify(ctx.request);
    ctx.state.token = decoded;
    await next();
});

router.post('/', async (ctx) => {
    try {
        const decoded = ctx.state.token;
        const res = await createRecord(
            ctx.request.body.description,
            ctx.request.body.value,
            ctx.request.body.wallet,
            ctx.request.body.timestamp,
            decoded.username,
        );

        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res);
    } catch (error) {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(error.message);
    }
});

router.get('/', async (ctx) => {
    const decoded = ctx.state.token;
    const records = await allByUser(decoded.username);
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify(records);
});

router.delete('/:id', async (ctx) => {
    try {
        const res = await byId(ctx.params.id);
        if (res.owner !== ctx.state.token.username) {
            ctx.response.status = 403;
            ctx.response.body = JSON.stringify({
                success: false,
                message: `not permitted`,
            });
        } else {
            const result = await deleteRecord(ctx.params.id);
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(result);
        }
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error.message);
    }
});

router.get('/:id', async (ctx) => {
    const username = ctx.state.token.username;
    const record = await byId(ctx.params.id);
    if (record.owner !== username) throw new ResourceNotAllowed();
    ctx.status = 200;
    ctx.body = JSON.stringify(record);
});

router.get('/wallet/:wallet', async (ctx) => {
    try {
        const decoded = ctx.state.token;
        const result = await byWallet(decoded.username, ctx.params.wallet);

        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(result);
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error.message);
    }
});

router.put('/', async (ctx) => {
    try {
        const decoded = ctx.state.token;
        const record = await byId(ctx.request.body.id);
        if (decoded.username !== record.owner) {
            ctx.response.status = 403;
            ctx.response.body = JSON.stringify({
                success: false,
                message: `not permitted`,
            });
        } else {
            const updatedRecord = await update(
                ctx.request.body.id,
                ctx.request.body.description,
                ctx.request.body.value,
                ctx.request.body.walletName,
                ctx.request.body.timestamp,
                decoded.username,
            );

            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(updatedRecord);
        }
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error.message);
    }
});

export default router.routes();
