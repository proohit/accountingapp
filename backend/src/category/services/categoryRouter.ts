import Router from '@koa/router';
import CategoryControllerImpl from '../controllers/CategoryController';

const router = new Router();

router.get('/:id', CategoryControllerImpl.getById);

router.get('/', CategoryControllerImpl.getByUser);

router.post('/', CategoryControllerImpl.create);

router.delete('/:id', CategoryControllerImpl.delete);

router.put('/:id', CategoryControllerImpl.update);

export default router.routes();
