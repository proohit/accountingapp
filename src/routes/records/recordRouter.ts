import Router from 'koa-router';

import { verify } from '../../database/database';
import { allByUser, createRecord, byId, byWallet, deleteRecord, update } from './RecordMapper';

const router = new Router();

router.use('/', async (ctx, next) => {
    try {
        const decoded = await verify(ctx.request);
        ctx.state.token = decoded;
        ctx.response.type = "application/json"
        await next();
    } catch (error) {

        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(error.message)
    }

})

router.post('/', async ctx => {
    try {
        const decoded = ctx.state.token;
        const res = await createRecord(ctx.request.body.description, ctx.request.body.value, ctx.request.body.wallet, ctx.request.body.timestamp, decoded.username)

        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res)
    } catch (error) {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(error.message);
    }
})

router.get('/', async ctx => {
    try {
        const decoded = ctx.state.token;
        const records = await allByUser(decoded.username);
        ;
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(records);
    } catch (error) {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(error.message);
    }
})

router.delete('/:id', async ctx => {
    try {
        const res = await byId(ctx.params.id);
        if (res.owner !== ctx.state.token.username) {
            ctx.response.status = 403;
            ctx.response.body = JSON.stringify({ success: false, message: `not permitted` });
        } else {
            const result = await deleteRecord(ctx.params.id)
                ;
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(result);
        }
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error.message);
    }
})

router.get('/:id', async ctx => {
    try {
        const record = await byId(ctx.params.id);
        if (record.owner !== ctx.state.token.username) {

            ctx.response.status = 403;
            ctx.response.body = JSON.stringify({ success: false, message: `not permitted` });
        } else {

            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(record);
        }
    } catch (error) {

        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error.message)
    }
})

router.get('/wallet/:wallet', async ctx => {
    try {
        const decoded = ctx.state.token;
        const result = await byWallet(decoded.username, ctx.params.wallet);

        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(result);
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error.message);
    }

})

router.put('/', async ctx => {
    try {
        const decoded = ctx.state.token;
        const record = await byId(ctx.request.body.id);
        if (decoded.username !== record.owner) {
            ctx.response.status = 403;
            ctx.response.body = JSON.stringify({ success: false, message: `not permitted` });
        } else {
            const updatedRecord = await update(ctx.request.body.id, ctx.request.body.description, ctx.request.body.value, ctx.request.body.walletName, ctx.request.body.timestamp, decoded.username)

            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(updatedRecord);
        }
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error.message);
    }
})

export default router.routes();