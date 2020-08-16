import { ControllerFunction } from '../../shared/models/BaseController';
import Wallet from '../models/Wallet';
import { MessageResult } from '../../shared/models/RouteResult';

export interface WalletController {
    createNewWallet: ControllerFunction<Wallet>;
    getByUser: ControllerFunction<Wallet[]>;
    getByUserByName: ControllerFunction<Wallet>;
    deleteByName: ControllerFunction<MessageResult>;
    updateByName: ControllerFunction<Wallet>;
}
