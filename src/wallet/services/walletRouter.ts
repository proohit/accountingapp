import Router from 'koa-router';
import WalletController from '../controllers/WalletController';

const walletController = new WalletController();
const router = new Router();

router.post('/', walletController.createNewWallet);

router.get('/', walletController.getByUser);

router.get('/:name', walletController.getByUserByName);

router.delete('/:name', walletController.deleteByName);

router.put('/:name', walletController.updateByName);

export default router.routes();
