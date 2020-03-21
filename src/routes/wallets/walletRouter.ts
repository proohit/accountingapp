import Router from 'koa-router';

import { verify } from '../../database/database';
import { byName, byUser, create, deleteWallet, update } from './WalletMapper';
import { deleteRecord, allByUser, byWallet, update as updateRecord } from '../records/RecordMapper';

const router = new Router();

router.use('/', async (ctx, next) => {
    try {
        const decoded = await verify(ctx.request);
        ctx.state.token = decoded;
        ctx.response.type = 'application/json'
        await next();
        return;
    } catch (error) {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(error.message)
        return;
    }

})

router.post('/', async ctx => {
    const decoded = ctx.state.token;
    try {
        const res = await create(ctx.request.body.name, ctx.request.body.balance, decoded.username);
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res)
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error)
        return;
    }
})

router.get('/', async ctx => {
    const decoded = ctx.state.token;
    try {
        const result = await byUser(decoded.username)

        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(result)
    } catch (error) {

        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error.message)
        return;
    }
})

router.get('/:name', async ctx => {
    try {
        const wallet = await byName(ctx.params.name, ctx.state.token.username);
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(wallet);
        return;
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error);
        return;
    }
})

router.delete('/:name', async ctx => {
    try {
        const recordsByUser = await allByUser(ctx.state.token.username)
        recordsByUser
            .filter(record => record.walletName === ctx.params.name)
            .forEach(async record => {
                await deleteRecord(record.id)
            })

        const res = await deleteWallet(ctx.params.name, ctx.state.token.username)

        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(res)
    } catch (error) {

        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error)
        return;
    }

})

router.put('/:name', async ctx => {
    try {
        const walletsByUser = await byUser(ctx.state.token.username);
        const recordsByWallet = await byWallet(ctx.state.token.username, ctx.params.name);
        if (walletsByUser.filter(wallet => wallet.name === ctx.request.body.name).length >= 1) {

            ctx.response.status = 400;
            ctx.response.body = JSON.stringify({ success: false, message: 'There is already a wallet with that name!' });
        } else {
            for (const record of recordsByWallet) {
                await updateRecord(record.id, record.description, record.value, null, record.timestamp, record.owner);
            }
            const editedWallet = await update(ctx.params.name, ctx.request.body.name, ctx.request.body.balance, ctx.state.token.username)

            for (const record of recordsByWallet) {
                await updateRecord(record.id, record.description, record.value, editedWallet.name, record.timestamp, record.owner);
            }

            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(editedWallet)
        }
    } catch (error) {

        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error)
        return;
    }
})



export default router.routes();