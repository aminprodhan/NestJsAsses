import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//https://github.com/bashleigh/nestjs-blog/blob/master/src/user/user.controller.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    //credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
