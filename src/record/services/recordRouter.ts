import Router from 'koa-router';
import RecordControllerImpl from '../controllers/RecordController';

const router = new Router();

router.post('/', RecordControllerImpl.createNewRecord);

router.get('/', RecordControllerImpl.getByUser);

router.delete('/:id', RecordControllerImpl.deleteById);

router.get('/:id', RecordControllerImpl.getById);

router.put('/:id', RecordControllerImpl.updateById);

router.get('/wallet/:wallet', RecordControllerImpl.getByWallet);

export default router.routes();
