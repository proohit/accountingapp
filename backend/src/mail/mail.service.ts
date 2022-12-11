import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../EnvirontmentVariables';
import { SecureUser } from '../users/entities/secure-user';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendConfirmationMail(user: SecureUser) {
    this.mailerService.sendMail({
      to: user.email,
      subject: '[Accounting App] Registration confirmation',
      template: 'registration-confirmation.hbs',
      context: {
        name: user.username,
        url: [
          this.configService.get(EnvironmentVariables.BACKEND_URL),
          'api',
          'auth',
          'confirm-registration',
        ].join('/'),
      },
    });
  }

  async sendResetTokenMail(user: SecureUser, token: string) {
    this.mailerService.sendMail({
      to: user.email,
      subject: '[Accounting App] Reset Password',
      template: 'password-reset.hbs',
      context: {
        name: user.username,
        token,
      },
    });
  }
}
