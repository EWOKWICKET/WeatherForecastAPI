import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3001;

  await app.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`);
  });
}
bootstrap();
