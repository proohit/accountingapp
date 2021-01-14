import Router from 'koa-router';
import WalletControllerImpl from '../controllers/WalletController';

const router = new Router();

router.post('/', WalletControllerImpl.createNewWallet);

router.get('/', WalletControllerImpl.getByUser);

router.get('/:id', WalletControllerImpl.getById);

router.delete('/:id', WalletControllerImpl.deleteById);

router.put('/:id', WalletControllerImpl.updateById);

export default router.routes();
