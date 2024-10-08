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
  app.setGlobalPrefix('api');
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          imgSrc: ["'self'"],
          styleSrc: [`'self'`],
          scriptSrc: ["'self'"],
          objectSrc: ["'self'"],
          defaultSrc: [`'self'`],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type',
  });
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
  SwaggerModule.setup('/', app, document);
  return app;
}

export default async function get_http_adapter_instance() {
  const app = await createApp();
  await app.init();
  return app.getHttpAdapter().getInstance();
}
