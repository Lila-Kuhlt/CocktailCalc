import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  app.enableShutdownHooks();
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          imgSrc: ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
          styleSrc: [`'self'`, `'unsafe-inline'`, 'https://cdn.jsdelivr.net'],
          scriptSrc: ["'self'", "https: 'unsafe-inline'", "'unsafe-eval'"],
          objectSrc: ["'self'"],
          defaultSrc: [`'self'`],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('CocktailCalc API')
    .setDescription(
      `
The CocktailCalc API description

* amounts are in cl
* prices are in €/cl
* buying list amounts are in l
    `,
    )
    .setVersion('1.0-alpha')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  return app;
}

export default async function get_http_adapter_instance() {
  const app = await createApp();
  await app.init();
  return app.getHttpAdapter().getInstance();
}
