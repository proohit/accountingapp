import { Module } from '@nestjs/common';
import Record from '../record/entities/record.entity';
import UseRepositories from '../use-repositories';
import { UsersModule } from '../users/users.module';
import { Wallet } from '../wallet/entities/wallet.entity';
import { WalletModule } from '../wallet/wallet.module';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [UseRepositories([Record, Wallet]), UsersModule, WalletModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
