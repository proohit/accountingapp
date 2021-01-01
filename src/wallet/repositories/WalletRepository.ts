import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../entity/User';
import { Wallet } from '../../entity/Wallet';
import { ResourceNotAllowed } from '../../shared/models/Errors';
import { WalletNotFound } from '../models/Errors';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
    async getByIdIfAllowed(id: Wallet['id'], username: User['username']): Promise<Wallet> {
        const wallet = await this.findOne(id);

        if (!wallet) {
            throw new WalletNotFound();
        }

        if (wallet.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        return wallet;
    }
}
