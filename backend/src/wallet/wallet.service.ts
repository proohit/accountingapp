import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Record from '../record/entities/record.entity';
import { User } from '../users/entities/user.entity';
import { Wallet } from './entities/wallet.entity';
import DuplicateWalletException from './errors/duplicate-wallet.error';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async create(
    name: Wallet['name'],
    balance: Wallet['balance'],
    username: User['username'],
  ) {
    const walletByNameByUser = await this.walletRepository.findOneBy({
      ownerUsername: username,
      name,
    });
    if (walletByNameByUser) {
      throw new DuplicateWalletException();
    }

    return this.walletRepository.save({
      name,
      balance,
      ownerUsername: username,
      currentBalance: balance,
    });
  }

  getByUser(username: User['username']) {
    return this.walletRepository.findBy({ ownerUsername: username });
  }

  async getById(id: Wallet['id'], username: User['username']) {
    const wallet = await this.walletRepository.findOneBy({ id });

    if (!wallet || wallet.ownerUsername !== username) {
      throw new NotFoundException();
    }

    return wallet;
  }

  async deleteById(id: Wallet['id'], username: User['username']) {
    const walletToDelete = await this.getById(id, username);

    return this.walletRepository.remove(walletToDelete);
  }

  async updateById(
    id: Wallet['id'],
    updatedName: Wallet['name'],
    initialBalance: Wallet['balance'],
    username: User['username'],
    updatedBalance?: Wallet['currentBalance'],
  ) {
    await this.getById(id, username);

    const walletWithNewName = await this.walletRepository.findOneBy({
      name: updatedName,
      ownerUsername: username,
    });

    if (walletWithNewName && walletWithNewName.id !== id) {
      throw new DuplicateWalletException();
    }

    let recalculatedBalance = updatedBalance;

    if (!updatedBalance && updatedBalance !== 0) {
      recalculatedBalance = await this.getCalculatedBalance(
        id,
        username,
        initialBalance,
      );
    }

    return this.walletRepository.save({
      id,
      balance: initialBalance,
      currentBalance: recalculatedBalance,
      name: updatedName,
      ownerUsername: username,
    });
  }

  async recalculateCurrentBalance(
    id: Wallet['id'],
    username: User['username'],
  ) {
    const walletToUpdate = await this.getById(id, username);
    const recalculatedBalance = await this.getCalculatedBalance(id, username);

    const updatedWallet = await this.updateById(
      id,
      walletToUpdate.name,
      walletToUpdate.balance,
      username,
      recalculatedBalance,
    );

    return updatedWallet;
  }

  private async getCalculatedBalance(
    id: Wallet['id'],
    username: User['username'],
    initialBalance?: Wallet['balance'],
  ) {
    const walletToUpdate = await this.getById(id, username);
    const recordsSumByWallet = await this.recordRepository
      .createQueryBuilder()
      .select(['COALESCE(SUM(value),0) as balanceByValue'])
      .where({ walletId: id })
      .getRawOne();
    const sanitizedInitialBalance = isNaN(initialBalance)
      ? walletToUpdate.balance
      : initialBalance;
    const newBalance =
      recordsSumByWallet.balanceByValue + sanitizedInitialBalance;
    return newBalance;
  }
}
