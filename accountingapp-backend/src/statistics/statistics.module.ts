import { Module } from '@nestjs/common';
import Record from '../record/entities/record.entity';
import UseRepositories from '../use-repositories';
import { Wallet } from '../wallet/entities/wallet.entity';
import { WalletService } from '../wallet/wallet.service';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [UseRepositories([Record, Wallet])],
  controllers: [StatisticsController],
  providers: [StatisticsService, WalletService],
})
export class StatisticsModule {}
