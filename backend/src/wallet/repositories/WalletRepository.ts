import { EntityRepository, Repository } from 'typeorm';
import { Wallet } from '../../entity/Wallet';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {}
