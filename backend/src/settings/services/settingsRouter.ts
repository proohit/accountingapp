import Router from '@koa/router';
import SETTINGS_CONTROLLER from '../controllers/SettingsController';

const router = new Router();

router.get('/', SETTINGS_CONTROLLER.getUserSettings);
router.put('/', SETTINGS_CONTROLLER.updateSettings);

export default router.routes();
