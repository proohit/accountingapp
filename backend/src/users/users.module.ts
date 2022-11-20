import { Module } from '@nestjs/common';
import { SettingsModule } from '../settings/settings.module';
import UseRepositories from '../use-repositories';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [UseRepositories([User]), SettingsModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
