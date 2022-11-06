import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UseRepositories from '../use-repositories';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    UseRepositories([User]),
    UsersModule,
    PassportModule.register({ session: true }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
