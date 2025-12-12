import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger(`N8N-BACKEND`);
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.setGlobalPrefix('api');

  
  await app.listen(process.env.PORT ?? 3000);
  
  logger.log(`🚀 Server is running on port ${process.env.PORT ?? 3000}`);
  logger.log(`👨‍💻 Developed by Sebastian Cheikh, thanks for using my API`)
}
bootstrap();
