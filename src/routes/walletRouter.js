const Router = require('koa-router')

const database = require('../database/database');
const walletMapper = require('../database/WalletMapper')
const recordMapper = require('../database/RecordMapper')

const router = new Router();

router.use('/', async (ctx, next) => {
    try {
        const decoded = await database.verify(ctx.request);
        ctx.state.token = decoded;
        await next();
        return;
    } catch (error) {
        ctx.response.type = 'application/json'
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(error)
        return;
    }

})

router.post('/', async ctx => {
    const decoded = ctx.state.token;
    try {
        const res = await walletMapper.create(ctx.request.body.name, ctx.request.body.balance, decoded.username);
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
        const result = await walletMapper.byUser(decoded.username)
        ctx.response.type = 'application/json'
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(result)
    } catch (error) {
        ctx.response.type = 400;
        ctx.response.body = JSON.stringify(error.message)
        return;
    }
})

router.get('/:name', async ctx => {
    try {
        const wallet = await walletMapper.byName(ctx.params.name, ctx.state.token.username);
        ctx.response.type = 'application/json';
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(wallet);
        return;
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(err);
        return;
    }
})

router.delete('/:name', async ctx => {
    try {
        const recordsByUser = await recordMapper.allByUser(ctx.state.token.username)
        recordsByUser.message
            .filter(record => record.wallet === ctx.params.name)
            .forEach(async record => {
                await recordMapper.deleteRecord(record.id)
            })

        const res = await walletMapper.deleteWallet(ctx.params.name, ctx.state.token.username)
        ctx.response.type = "application/json"
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(res)
    } catch (error) {
        ctx.response.type = "application/json"
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error)
        return;
    }

})

router.put('/:name', async ctx => {
    try {
        const walletsByUser = await walletMapper.byUser(ctx.state.token.username);
        const recordsByWallet = await recordMapper.byWallet(ctx.state.token.username, ctx.params.name);
        if (walletsByUser.message.filter(wallet => wallet.name === ctx.request.body.name).length >= 1) {
            ctx.response.type = "application/json"
            ctx.response.status = 400;
            ctx.response.body = JSON.stringify({ success: false, message: 'There is already a wallet with that name!' });
        } else {
            for (const record of recordsByWallet.message) {
                await recordMapper.update(record.id, record.description, record.value, null, record.timestamp, record.owner);
            }
            const editedWallet = await walletMapper.update(ctx.params.name, ctx.request.body.name, ctx.request.body.balance, ctx.state.token.username)

            for (const record of recordsByWallet.message) {
                await recordMapper.update(record.id, record.description, record.value, editedWallet.message[0].name, record.timestamp, record.owner);
            }
            ctx.response.type = "application/json"
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(editedWallet)
        }
    } catch (error) {
        ctx.response.type = "application/json"
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error)
        return;
    }
})




module.exports = router.routes();