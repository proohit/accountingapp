import { Module } from '@nestjs/common';
import Record from '../record/entities/record.entity';
import UseRepositories from '../use-repositories';
import { User } from '../users/entities/user.entity';
import { Wallet } from './entities/wallet.entity';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [UseRepositories([User, Wallet, Record])],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
