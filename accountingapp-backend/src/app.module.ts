import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    AuthModule,
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
    CategoryModule,
    RecordModule,
    WalletModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
