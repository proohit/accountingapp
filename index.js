const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const config = require('./config.json');
const parser = require('koa-bodyparser');

const database = require('./src/database/database');

const app = new Koa();
const router = new Router();
const combinedRouter = require('./src/routes/router')

app.use(parser());
app.use(cors());
app.use(combinedRouter());

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


app.use(router.allowedMethods({throw:true}));
app.use(router.routes())
try {
    app.listen('3000');
    console.log('running on port 3000');
} catch (e) {
    console.log(e);
}