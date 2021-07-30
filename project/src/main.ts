import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8000);
}
bootstrap();

//* 몽고디비 호스트주소
//* mongodb+srv://don:1234@nestcluster.ybavs.mongodb.net/mmm
