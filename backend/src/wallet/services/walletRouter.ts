import Router from '@koa/router';
import WalletControllerImpl from '../controllers/WalletController';

const router = new Router();

router.post('/', WalletControllerImpl.createNewWallet);

router.get('/', WalletControllerImpl.getByUser);

router.get('/:id', WalletControllerImpl.getById);

router.delete('/:id', WalletControllerImpl.deleteById);

router.put('/:id', WalletControllerImpl.updateById);

router.put('/:id/updateBalance', WalletControllerImpl.updateBalance);

export default router.routes();
