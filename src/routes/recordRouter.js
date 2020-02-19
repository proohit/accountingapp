const Router = require('koa-router')

const database = require('../database/database');
const recordMapper = require('../database/RecordMapper')

const router = new Router({ prefix: '/records' });

router.post('/', async ctx => {
    await database.verify(ctx.request).then(async decoded => {
        await recordMapper.createRecord(ctx.request.body.description, ctx.request.body.value, ctx.request.body.wallet, decoded.username).then(res => {
            ctx.response.type = 'application/json'
            ctx.response.status = 201;
            ctx.response.body = JSON.stringify(res)
        }).catch(err => {
            console.log(err);
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
            ctx.response.type = 'application/json';
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify(data);
        })
    }).catch(err => {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(err);
    });
})

router.delete('/:id', async ctx => {
    await database.verify(ctx.request).then(async decoded => {
        await recordMapper.byId(ctx.params.id).then(async res => {
            console.log(res);
            if (res.message.length <= 0) {
                ctx.response.type = 'application/json';
                ctx.response.status = 400;
                ctx.response.body = JSON.stringify({ success: false, message: `no record with id ${ctx.params.id}` });
            } else if (res[0].owner !== decoded.username) {
                ctx.response.status = 403;
                ctx.response.body = JSON.stringify({ success: false, message: `not permitted` });
            } else {
                await recordMapper.deleteRecord(ctx.params.id).then(result => {
                    ctx.response.type = 'application/json';
                    ctx.response.status = 200;
                    ctx.response.body = JSON.stringify(result);
                }).catch(err => {
                    ctx.response.status = 400;
                    ctx.response.body = JSON.stringify(err);
                })
            }
        })

    }).catch(err => {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(err);
    });
})

router.get('/:id', async ctx => {
    await database.verify(ctx.request).then(async decoded => {
        await recordMapper.byId(ctx.params.id).then(async record => {
            if (record.message.owner !== decoded.username) {
                ctx.response.status = 403;
                ctx.response.body = JSON.stringify({ success: false, message: `not permitted` });
            } else {
                ctx.response.type = 'application/json'
                ctx.response.status = 200;
                ctx.response.body = JSON.stringify(record);
            }
        }).catch(err => {
            ctx.response.status = 400;
            ctx.response.body = JSON.stringify(err);
        })
    }).catch(err => {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify({ success: false, message: `not permitted` });
    })
})

module.exports = router;