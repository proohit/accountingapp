import Router from '@koa/router';
import RecurrentRecordControllerImpl from '../controllers/RecurrentRecordControllerImpl';

const router = new Router();

router.post('/', RecurrentRecordControllerImpl.createNewRecurrentRecord);

router.get('/', RecurrentRecordControllerImpl.getByUser);

router.delete('/:id', RecurrentRecordControllerImpl.deleteById);

router.get('/:id', RecurrentRecordControllerImpl.getById);

router.put('/:id', RecurrentRecordControllerImpl.updateById);

export default router.routes();
