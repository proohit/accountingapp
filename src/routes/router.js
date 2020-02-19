const combineRouters = require('koa-combine-routers')
const recordRouter = require('./recordRouter')
const walletRouter = require('./walletRouter')

const router = combineRouters(
    recordRouter, walletRouter
)
module.exports = router;