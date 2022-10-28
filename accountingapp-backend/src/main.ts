import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import passport from 'passport';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { EnvironmentVariables } from './EnvirontmentVariables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.use(
    session({
      secret: config.get(EnvironmentVariables.SESSION_SECRET),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: config.get(
          EnvironmentVariables.SESSION_MAX_AGE,
          1000 * 60 * 60 * 24 * 30,
        ),
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('api');

  const port = config.get(EnvironmentVariables.PORT, 3002);
  await app.listen(port);
  Logger.log(`Listening on port ${port}`);
}
bootstrap();
