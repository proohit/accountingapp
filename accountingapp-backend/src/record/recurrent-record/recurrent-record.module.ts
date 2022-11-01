import { Module } from '@nestjs/common';
import { CategoryModule } from '../../category/category.module';
import { Category } from '../../category/entities/category.entity';
import UseRepositories from '../../use-repositories';
import { User } from '../../users/entities/user.entity';
import { UsersModule } from '../../users/users.module';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { WalletModule } from '../../wallet/wallet.module';
import Record from '../entities/record.entity';
import { RecordModule } from '../record.module';
import { RecurrentRecord } from './entities/recurrent-record.entity';
import { RecurrentRecordSchedulerService } from './recurrent-record-scheduler.service';
import { RecurrentRecordController } from './recurrent-record.controller';
import { RecurrentRecordService } from './recurrent-record.service';

@Module({
  imports: [
    UseRepositories([User, RecurrentRecord, Record, Category, Wallet]),
    RecordModule,
    CategoryModule,
    WalletModule,
    UsersModule,
  ],
  controllers: [RecurrentRecordController],
  providers: [RecurrentRecordService, RecurrentRecordSchedulerService],
})
export class RecurrentRecordModule {}
