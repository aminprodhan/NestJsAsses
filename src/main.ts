import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//https://github.com/bashleigh/nestjs-blog/blob/master/src/user/user.controller.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
