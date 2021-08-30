import Router from '@koa/router';
import USER_CONTROLLER from '../controllers/UserController';

const router = new Router();

router.get('/me', USER_CONTROLLER.getCurrentUser);
router.put('/password-change', USER_CONTROLLER.changePassword);

export default router.routes();
