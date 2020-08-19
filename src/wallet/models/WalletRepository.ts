import { Repository } from '../../shared/models/Repository';
import Wallet from './Wallet';
import { MessageResult } from '../../shared/models/RouteResult';

export interface WalletRepository extends Repository {
    update: (oldWalletName: string, newWalletName: string, newBalance: number, owner: string) => Promise<Wallet>;
    deleteWallet: (name: string, owner: string) => Promise<MessageResult>;
    create: (name: string, balance: number, owner: string) => Promise<Wallet>;
    byUser: (owner: string) => Promise<Wallet[]>;
    byName: (name: string, owner: string) => Promise<Wallet>;
    createConstraints: () => Promise<void>;
    createIndices: () => Promise<void>;
}
