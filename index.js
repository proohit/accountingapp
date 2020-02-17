const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const config = require('./config.json');
const parser = require('koa-bodyparser');

const database = require('./src/database/database');

const app = new Koa();
const router = new Router();

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
router.post('/login', ctx => {
    database.login(ctx.request).then(res => {
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(res);
    }).catch(err => {
        ctx.response.status = 400;
        ctx.response.body = JSON.stringify(err);
    })
})
router.get('/', ctx => {
    database.verify(ctx.request).then(decoded => {
        //do Api stuff
        const data = {
            id: 1,
            username: "direnc",
            records: [
                { date: new Date(), value: -1, description: "einkaufen" },
                { date: new Date(), value: -35, description: "switch game" },
                { date: new Date(), value: 12, description: "essen" }

            ]
        };
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(data);
    }).catch(err => {
        ctx.response.status = 403;
        ctx.response.body = JSON.stringify(err);
    });
    /* 
    if (database.verify) {
        ctx.response.status = 403;
        return;
    }
 
    const data = {
        id: 1,
        username: "direnc",
        records: [
            { date: new Date(), value: -1, description: "einkaufen" },
            { date: new Date(), value: -35, description: "switch game" },
            { date: new Date(), value: 12, description: "essen" }
 
        ]
    };
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify(data); */
})

app.use(cors());
app.use(parser());
app.use(router.routes()).use(router.allowedMethods());

try {
    app.listen('3000');
} catch (e) {
    console.log(e);
}