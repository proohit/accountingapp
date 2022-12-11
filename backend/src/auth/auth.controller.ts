import { UserDto } from '@accountingapp/shared';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SecureUser } from '../users/entities/secure-user';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';
import ChangePasswordDto from './dtos/change-password.dto';
import CreateUserDto from './dtos/create-user.dto';
import RequestResetTokenDto from './dtos/request-reset-token.dto';
import ResetPasswordDto from './dtos/reset-password.dto';
import { LocalAuthGuard } from './local.guard';
import { LoggedInUser } from './user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@LoggedInUser() user: SecureUser): Promise<UserDto> {
    return user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  async me(@LoggedInUser() user: SecureUser): Promise<UserDto> {
    return user;
  }

  @Post('register')
  async register(
    @Request() req,
    @Body() user: CreateUserDto,
  ): Promise<UserDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = await this.authService.register(
          user.username,
          user.password,
          user.email,
        );
        req.login(newUser, (err) => {
          if (err) {
            reject(err);
          }
          resolve(newUser);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Request() req) {
    await req.session.destroy();
  }

  @UseGuards(AuthenticatedGuard)
  @Put('password-change')
  async changePassword(
    @Request() req,
    @Body() body: ChangePasswordDto,
    @LoggedInUser() user: SecureUser,
  ): Promise<UserDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = await this.authService.changePassword(
          user.username,
          body.password,
          body.newPassword,
        );
        req.login(newUser, (err) => {
          if (err) {
            reject(err);
          }
          resolve(newUser);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  @Put('password-reset')
  async resetPassword(@Body() body: ResetPasswordDto): Promise<UserDto> {
    return this.authService.resetPassword(
      body.username,
      body.token,
      body.newPassword,
    );
  }

  @Put('request-reset-token')
  async requestResetToken(@Body() body: RequestResetTokenDto): Promise<any> {
    return this.authService.requestResetToken(body.username);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('confirm-registration')
  async confirmRegistration(@LoggedInUser() user: SecureUser) {
    await this.authService.confirmRegistration(user.username);
    return 'Registration confirmed!';
  }
}
