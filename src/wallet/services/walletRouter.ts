import Router from 'koa-router';
import WalletControllerImpl from '../controllers/WalletController';

const router = new Router();

router.post('/', WalletControllerImpl.createNewWallet);

router.get('/', WalletControllerImpl.getByUser);

router.get('/:name', WalletControllerImpl.getByUserByName);

router.delete('/:name', WalletControllerImpl.deleteByName);

router.put('/:name', WalletControllerImpl.updateByName);

export default router.routes();
