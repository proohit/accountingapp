import Router from '@koa/router';
import StatisticsControllerImpl from '../controllers/StatisticsController';

const router = new Router();

router.get('/', StatisticsControllerImpl.getStatistics);
router.get('/categories', StatisticsControllerImpl.getCategoryStatistics);

export default router.routes();
