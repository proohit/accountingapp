import { Module } from '@nestjs/common';
import UseRepositories from '../use-repositories';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [UseRepositories([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
