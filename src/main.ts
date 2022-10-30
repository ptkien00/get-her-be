import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as express from 'express';
import * as http from 'http';
import helmet from 'helmet';
import { cert, initializeApp } from 'firebase-admin/app';

import { AppModule } from '@/app.module';
import { EnvService } from '@/config/env/env.service';

async function bootstrap() {

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const envService = app.get(EnvService);

  app.enableCors({
    origin: [
      envService.frontendOrigin,
    ],
  });

  app.use(helmet());
  app.use(cookieParser());
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
      },
    })
  );

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  if (!envService.isProduction) {

    const swaggerConfig = new DocumentBuilder()
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('docs', app, document);
  }

  initializeApp({
    credential: cert({
      projectId: envService.firebaseProjectId,
      privateKey: envService.firebasePrivateKey,
      clientEmail: envService.firebaseClientEmail,
    }),
  });

  await app.init();
  http.createServer(server).listen(3000);
}

bootstrap();