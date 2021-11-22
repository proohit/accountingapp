import Router from '@koa/router';
import StatisticsControllerImpl from '../controllers/StatisticsController';

const router = new Router();

router.get('/', StatisticsControllerImpl.getStatistics);
router.get('/categories', StatisticsControllerImpl.getCategoryStatistics);
router.get('/month-status', StatisticsControllerImpl.getMonthStatus);

export default router.routes();
