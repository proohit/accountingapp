import Router from '@koa/router';
import AuthenticationControllerImpl from '../controllers/AuthenticationControllerImpl';
const router = new Router();

router.post('/register', AuthenticationControllerImpl.register);
router.post('/login', AuthenticationControllerImpl.login);
router.post('/logout', AuthenticationControllerImpl.logout);
export default router.routes();
