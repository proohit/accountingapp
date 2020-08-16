import Router from 'koa-router';
import RecordControllerImpl from '../controllers/RecordController';

const router = new Router();

router.post('/', RecordControllerImpl.createNewRecord);

router.get('/', RecordControllerImpl.getByUser);

router.delete('/:id', RecordControllerImpl.deleteById);

router.get('/:id', RecordControllerImpl.getById);

router.get('/wallet/:wallet', RecordControllerImpl.getByWallet);

router.put('/', RecordControllerImpl.updateById);

export default router.routes();
