import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import UseRepositories from '../use-repositories';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Wallet } from '../wallet/entities/wallet.entity';
import { WalletModule } from '../wallet/wallet.module';
import { WalletService } from '../wallet/wallet.service';
import Record from './entities/record.entity';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [
    UseRepositories([Record, Category, Wallet, User]),
    CategoryModule,
    WalletModule,
    UsersModule,
  ],
  controllers: [RecordController],
  providers: [RecordService, CategoryService, WalletService, UsersService],
})
export class RecordModule {}
