import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from '@modules/config/config.service';

export const swaggerConfig = (app: INestApplication) => {
  const appConfigService = app.get(AppConfigService);
  const thisService = appConfigService.thisService();

  const config = new DocumentBuilder()
    .setTitle(`${thisService} SERVICES DOCUMENT`)
    .setDescription('API definition')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
};
