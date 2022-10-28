import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user.username, user.password, user.email);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Request() req) {
    await req.session.destroy();
  }
}
