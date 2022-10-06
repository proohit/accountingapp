import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';
import { Wallet } from '../../entity/Wallet';

type ManipulateWalletRequest = {
    name: Wallet['name'];
    balance: Wallet['balance'];
};

export interface WalletController {
    createNewWallet: ControllerFunction<Wallet, ManipulateWalletRequest>;
    getByUser: ControllerFunction<Wallet[]>;
    getById: ControllerFunction<Wallet>;
    deleteById: ControllerFunction<MessageResult>;
    updateById: ControllerFunction<Wallet, ManipulateWalletRequest>;
    updateBalance: ControllerFunction<Wallet>;
}
