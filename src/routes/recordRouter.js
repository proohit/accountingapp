const Router = require('koa-router')

const database = require('../database/database');
const recordMapper = require('../database/RecordMapper')

const router = new Router();

router.post('/', async ctx => {
    await database.verify(ctx.request).then(async decoded => {
        await recordMapper.createRecord(ctx.request.body.description, ctx.request.body.value, ctx.request.body.wallet, ctx.request.body.timestamp, decoded.username).then(res => {
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
            if (res.message.length <= 0) {
                ctx.response.type = 'application/json';
                ctx.response.status = 400;
                ctx.response.body = JSON.stringify({ success: false, message: `no record with id ${ctx.params.id}` });
            } else if (res.message.owner !== decoded.username) {
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

router.get('/wallet/:wallet', async ctx => {
    try {
        const decoded = await database.verify(ctx.request);
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
    await database.verify(ctx.request).then(async decoded => {
        await recordMapper.byId(ctx.request.body.id).then(async record => {
            if (record.message.owner !== decoded.username) {
                ctx.response.status = 403;
                ctx.response.body = JSON.stringify({ success: false, message: `not permitted` });
            } else {
                await recordMapper.update(ctx.request.body.id, ctx.request.body.description, ctx.request.body.value, ctx.request.body.walletName, decoded.username).then(updatedRecord => {
                    ctx.response.type = 'application/json'
                    ctx.response.status = 200;
                    ctx.response.body = JSON.stringify(updatedRecord);
                })
            }
        }).catch(err => {
            ctx.response.status = 400;
            ctx.response.body = JSON.stringify(err);
        })
    }).catch(err => {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(err);
    })
})

module.exports = router.routes();