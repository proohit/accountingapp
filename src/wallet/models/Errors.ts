import { ResourceNotFound } from '../../shared/models/Errors';

export class WalletNotFound extends ResourceNotFound {
    constructor() {
        super('Wallet not found');
    }
}
