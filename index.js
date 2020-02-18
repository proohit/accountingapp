const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const config = require('./config.json');
const parser = require('koa-bodyparser');


const database = require('./src/database/database');
const recordMapper = require('./src/database/RecordMapper')

const app = new Koa();
const router = new Router();

app.use(parser());
app.use(cors());

checkAuthorization = (req) => {
    database.verify(req)
}
router.get('/user/:id/records', async ctx => {
    if (!checkAuthorization(ctx.request.headers.authorization)) {
        ctx.response.status = 403;
        return;
    }

    await database.all().then(data => ctx.body = JSON.stringify(data));

})
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
router.post('/register', async ctx => {
    await database.register(ctx.request.body.username, ctx.request.body.password).then(res => {
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res);
    }).catch(err => {
        console.log(err);
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(err);
    });
})
router.post('/login', async ctx => {
    await database.login(ctx.request).then(res => {
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res);
    }).catch(err => {
        ctx.response.status = 400;
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

app.use(router.allowedMethods({throw:true}));
app.use(router.routes())
try {
    app.listen('3000');
    console.log('running on port 3000');
} catch (e) {
    console.log(e);
}