const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const config = require('./config.json');

const app = new Koa();
const router = new Router();

checkAuthorization = (auth) => {
    if (!auth) {
        return false;
    } else {
        if (auth !== config.token) {
            return false;
        } else {
            return true;
        }
    }
}

router.get('/', ctx => {

    if (!checkAuthorization(ctx.request.headers.authorization)) {
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
    ctx.response.body = JSON.stringify(data);
})

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

try {
    app.listen('3000');
} catch (e) {
    console.log(e);
}