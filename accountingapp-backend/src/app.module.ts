import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  providers: [AppService, ConfigService],
})
export class AppModule {}
