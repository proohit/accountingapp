import { Module } from '@nestjs/common';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/entities/category.entity';
import UseRepositories from '../../use-repositories';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { WalletService } from '../../wallet/wallet.service';
import Record from '../entities/record.entity';
import { RecordService } from '../record.service';
import { RecurrentRecord } from './entities/recurrent-record.entity';
import { RecurrentRecordSchedulerService } from './recurrent-record-scheduler.service';
import { RecurrentRecordController } from './recurrent-record.controller';
import { RecurrentRecordService } from './recurrent-record.service';

@Module({
  imports: [UseRepositories([User, RecurrentRecord, Record, Category, Wallet])],
  controllers: [RecurrentRecordController],
  providers: [
    RecordService,
    CategoryService,
    WalletService,
    UsersService,
    RecurrentRecordService,
    RecurrentRecordSchedulerService,
  ],
})
export class RecurrentRecordModule {}
