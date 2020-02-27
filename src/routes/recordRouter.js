const Router = require('koa-router')

const database = require('../database/database');
const recordMapper = require('../database/RecordMapper')

const router = new Router();

router.use('/', async (ctx, next) => {
    try {
        const decoded = await database.verify(ctx.request);
        ctx.state.token = decoded;
        await next();
    } catch (error) {
        ctx.response.type = 'application/json'
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(error)
    }

})

router.post('/', async ctx => {
    try {
        const decoded = ctx.state.token;
        const res = await recordMapper.createRecord(ctx.request.body.description, ctx.request.body.value, ctx.request.body.wallet, ctx.request.body.timestamp, decoded.username)
        ctx.response.type = 'application/json'
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res)
    } catch (error) {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(err);
    }
})

router.get('/', async ctx => {
    try {
        const decoded = ctx.state.token;
        await recordMapper.allByUser(decoded.username).then(data => {
            ctx.response.type = 'application/json';
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(data);
        })
    } catch (error) {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(err);
    }
})

router.delete('/:id', async ctx => {
    try {
        const res = await recordMapper.byId(ctx.params.id);
        if (res.message.owner !== ctx.state.token.username) {
            ctx.response.status = 403;
            ctx.response.body = JSON.stringify({ success: false, message: `not permitted` });
        } else {
            const result = await recordMapper.deleteRecord(ctx.params.id)
            ctx.response.type = 'application/json';
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(result);
        }
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(err);
    }
})

router.get('/:id', async ctx => {
    try {
        const record = await recordMapper.byId(ctx.params.id);
        if (record.message.owner !== ctx.state.token.username) {
            ctx.response.type = 'application/json'
            ctx.response.status = 403;
            ctx.response.body = JSON.stringify({ success: false, message: `not permitted` });
        } else {
            ctx.response.type = 'application/json'
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(record);
        }
    } catch (error) {
        ctx.response.type = 'application/json'
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(error)
    }
})

router.get('/wallet/:wallet', async ctx => {
    try {
        const decoded = ctx.state.token;
        const result = await recordMapper.byWallet(decoded.username, ctx.params.wallet);
        ctx.response.type = 'application/json'
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(result);
    } catch (err) {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(err);
    }

})

router.put('/', async ctx => {
    try {
        const decoded = ctx.state.token;
        const record = await recordMapper.byId(ctx.request.body.id);
        if (decoded.username !== record.message.owner) {
            ctx.response.status = 403;
            ctx.response.body = JSON.stringify({ success: false, message: `not permitted` });
        } else {
            const updatedRecord = await recordMapper.update(ctx.request.body.id, ctx.request.body.description, ctx.request.body.value, ctx.request.body.walletName, ctx.request.body.timestamp, decoded.username)
            ctx.response.type = 'application/json'
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(updatedRecord);
        }
    } catch (error) {

    }
})

module.exports = router.routes();