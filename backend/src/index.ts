import Koa from 'koa';
import parser from 'koa-bodyparser';
import cors from 'koa-cors';
import Router from '@koa/router';
import config from '../config.json';
import recordRouter from './record/services/recordRouter';
import { RouteResult } from './shared/models/RouteResult';
import authenticationRouter from './shared/services/authenticationRouter';
import documentationRouter from './shared/services/documentationRouter';
import securedContextRouter from './shared/services/securedContextRouter';
import walletRouter from './wallet/services/walletRouter';
import logger from './shared/services/loggingService';
import categoryRouter from './category/services/categoryRouter';
import userRouter from './user/services/userRouter';
import 'reflect-metadata';
import statisticsRouter from './statistics/services/statisticsRouter';

const app = new Koa();
const router = new Router({ prefix: '/api' });

app.use(parser());
app.use(cors({ credentials: true }));

router.use('/docs', documentationRouter);
import session from 'koa-session';
app.keys = [config.secret];
app.use(session({ maxAge: 1000 * 60 * 60 * 24 * 30 /* 30 days */ }, app));

import passport from 'koa-passport';
import settingsRouter from './settings/services/settingsRouter';
import { services } from './shared/services/services';
import dataSource from './shared/repositories/dataSource';
app.use(passport.initialize());
app.use(passport.session());

router.use(async (ctx, next) => {
    try {
        ctx.type = 'application/json';
        const result: RouteResult<unknown> = await next();
        if (result?.status) {
            ctx.status = result.status;
        }
        if (result?.data) {
            ctx.body = JSON.stringify(result.data);
        }
        if (!ctx.status || !ctx.body) {
            throw new Error();
        }
    } catch (error) {
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = {
            message: ctx.status >= 500 ? 'Oops, something went wrong...' : error.message,
        };
        if (ctx.status >= 500) {
            logger.error({ message: error.message, trace: error.stack });
        }
    }
});
router.use('/auth', authenticationRouter);
router.use(securedContextRouter);
router.use('/users', userRouter);
router.use('/records', recordRouter);
router.use('/wallets', walletRouter);
router.use('/categories', categoryRouter);
router.use('/statistics', statisticsRouter);
router.use('/settings', settingsRouter);

app.use(router.allowedMethods({ throw: true }));
app.use(router.routes());

async function start() {
    try {
        await dataSource.initialize();
        services();
        app.listen(config.backendPort);
        console.log(`running on port ${config.backendPort}`);
    } catch (e) {
        console.log(e);
    }
}

start();
