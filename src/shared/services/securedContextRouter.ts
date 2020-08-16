import Router from 'koa-router';
import { verify } from '../repositories/authenticationMapper';
import recordRouter from '../../record/services/recordRouter';
import walletRouter from '../../wallet/services/walletRouter';

const router = new Router();

router.use('/', async (ctx, next) => {
    const decoded = verify(ctx.request);
    ctx.state.token = decoded;
    await next();
});

router.use('/records', recordRouter);
router.use('/wallets', walletRouter);

export default router.routes();
