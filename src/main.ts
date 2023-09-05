import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { Request, Response, NextFunction, json, urlencoded } from 'express';
import { AppModule } from '@app.module';
import { AppConfigService } from '@modules/config/config.service';
import { swaggerConfig } from '@config';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  const configService = app.get(ConfigService);
  const appConfigService = app.get(AppConfigService);

  const thisHTTPPort = appConfigService.getThisHTTPPort();

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });

  app.enableCors({
    origin: configService.get<string>('ALLOW_ORIGINS').split(','),
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  // app.useStaticAssets(join(__dirname, '..', 'public')); // optional
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('hbs');
  swaggerConfig(app);
  await app.listen(thisHTTPPort);
  console.log(
    `${appConfigService.thisService()}_HTTP Server listen on ${thisHTTPPort}`,
  );
}
bootstrap();
