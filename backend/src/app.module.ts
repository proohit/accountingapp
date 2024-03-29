import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { MailModule } from './mail/mail.module';
import { RecordModule } from './record/record.module';
import { RecurrentRecordModule } from './record/recurrent-record/recurrent-record.module';
import { SettingsModule } from './settings/settings.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        const { default: dataSource } = await import('./dataSource');
        await dataSource.initialize();
        return dataSource;
      },
    }),
    SettingsModule,
    CategoryModule,
    RecordModule,
    WalletModule,
    StatisticsModule,
    RecurrentRecordModule,
    MailModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
