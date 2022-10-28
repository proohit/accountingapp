import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body() req: User) {
    return this.authService.register(req.username, req.password, req.email);
  }
}
