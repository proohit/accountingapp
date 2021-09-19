import Router from '@koa/router';
import RecordControllerImpl from '../controllers/RecordController';
import recurrentRecordRouter from './recurrentRecordRouter';

const router = new Router();

router.post('/', RecordControllerImpl.createNewRecord);

router.get('/', RecordControllerImpl.getByUser);

router.use('/recurrentRecords', recurrentRecordRouter);

router.delete('/:id', RecordControllerImpl.deleteById);

router.get('/:id', RecordControllerImpl.getById);

router.put('/:id', RecordControllerImpl.updateById);

router.get('/category/:category', RecordControllerImpl.getByCategory);

router.get('/wallet/:wallet', RecordControllerImpl.getByWallet);

export default router.routes();
