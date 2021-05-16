import Router from '@koa/router';
import USER_CONTROLLER from '../controllers/UserController';

const router = new Router();

router.get('/me', USER_CONTROLLER.getCurrentUser);

export default router.routes();
