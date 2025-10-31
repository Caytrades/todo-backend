import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);


 const allowed = (configService.get<string>('CORS_ORIGIN') || '')
    .split(',')
    .map((o) => o.trim())
    .filter((o) => !!o);

  const corsOptions: CorsOptions = {
    origin: (incomingOrigin, callback) => {
      if (!incomingOrigin || allowed.includes(incomingOrigin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: ${incomingOrigin} not allowed`));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
