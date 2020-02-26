const Router = require('koa-router')

const database = require('../database/database');
const walletMapper = require('../database/WalletMapper')

const router = new Router();

router.post('/', async ctx => {
    await database.verify(ctx.request).then(async decoded => {
        await walletMapper.create(ctx.request.body.name, ctx.request.body.balance, decoded.username).then(res => {
            ctx.response.type = 'application/json'
            ctx.response.status = 201;
            ctx.response.body = JSON.stringify(res)
        }).catch(err => {
            ctx.response.status = 400;
            ctx.response.body = JSON.stringify(err);
        })
    }).catch(err => {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(err);
    })
})

router.get('/', async ctx => {
    try {
        const decoded = await database.verify(ctx.request);
        const result = await walletMapper.byUser(decoded.username)

        ctx.response.type = 'application/json'
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(result)
        return;
    } catch (error) {
        ctx.response.body = JSON.stringify(error.message)
    }
})

router.get('/:name', async ctx => {
    await database.verify(ctx.request).then(async decoded => {
        await walletMapper.byName(ctx.params.name).then(data => {
            ctx.response.type = 'application/json';
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(data);
        })
    }).catch(err => {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(err);
    });
})


module.exports = router.routes();