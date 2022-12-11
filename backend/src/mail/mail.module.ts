import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../EnvirontmentVariables';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get(EnvironmentVariables.MAIL_HOST),
          port: configService.get(EnvironmentVariables.MAIL_PORT),
          secure:
            configService.get(EnvironmentVariables.ENVIRONMENT) !==
            'development',
          auth: {
            user: configService.get(EnvironmentVariables.MAIL_USER),
            pass: configService.get(EnvironmentVariables.MAIL_PASSWORD),
          },
        },
        defaults: {
          from: configService.get(EnvironmentVariables.MAIL_FROM),
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
