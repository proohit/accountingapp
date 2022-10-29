import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { RecordModule } from './record/record.module';
import { SettingsModule } from './settings/settings.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
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
  ],
  providers: [ConfigService],
})
export class AppModule {}
