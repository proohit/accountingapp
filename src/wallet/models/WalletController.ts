import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';
import { Wallet } from '../../entity/Wallet';

export interface WalletController {
    createNewWallet: ControllerFunction<Wallet>;
    getByUser: ControllerFunction<Wallet[]>;
    getById: ControllerFunction<Wallet>;
    deleteById: ControllerFunction<MessageResult>;
    updateById: ControllerFunction<Wallet>;
}
