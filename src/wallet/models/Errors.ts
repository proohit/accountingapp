import { ResourceNotFound, BadRequest } from '../../shared/models/Errors';

export class WalletNotFound extends ResourceNotFound {
    constructor() {
        super('Wallet not found');
    }
}

export class DuplicateWallet extends BadRequest {
    constructor() {
        super('Wallet with this name already exists');
    }
}
