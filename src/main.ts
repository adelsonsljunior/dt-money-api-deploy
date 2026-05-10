import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  app.setGlobalPrefix('api');

  //Swagger setup
  const config = new DocumentBuilder()
    .setTitle('DT Money API')
    .setDescription('API para gerenciamento de transações financeiras')
    .setVersion('1.0')
    .addTag('transactions', 'Endpoints relacionados a transações financeiras')
    .addTag('users', 'Endpoints relacionados a usuários')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: true,
  });

  
  // habilitar cors
  app.enableCors();
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
