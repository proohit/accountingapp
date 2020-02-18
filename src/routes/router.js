const combineRouters = require('koa-combine-routers')
const recordRouter = require('./recordRouter')

const router = combineRouters(
    recordRouter
)
module.exports = router;