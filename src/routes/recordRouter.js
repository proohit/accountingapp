const Router = require('koa-router')

const database = require('../database/database');
const recordMapper = require('../database/RecordMapper')

const router = new Router();

router.post('/records', async ctx => {
    await database.verify(ctx.request).then(async decoded => {
        await recordMapper.createRecord(ctx.request.body.description, ctx.request.body.value, ctx.request.body.wallet, decoded.username).then(res => {
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
    await database.verify(ctx.request).then(async decoded => {
        await recordMapper.allByUser(decoded.username).then(data => {
            ctx.response.type= 'application/json';
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(data);
        })
    }).catch(err => {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(err);
    });
})

module.exports = router;