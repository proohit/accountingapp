import Router from 'koa-router';
import CategoryControllerImpl from '../controllers/CategoryController';

const router = new Router();

router.get('/:name', CategoryControllerImpl.getByName);

router.get('/', CategoryControllerImpl.getByUser);

router.post('/', CategoryControllerImpl.create);

router.delete('/:name', CategoryControllerImpl.delete);

router.put('/:name', CategoryControllerImpl.update);

export default router.routes();
