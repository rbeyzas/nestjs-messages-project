import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe());
  //burası gelen her isteiği doğrulayacak. artık her bir toplu işlemde doğrulama yapılacak. her route için ayrı ayrı validation yapmamıza gerek yok
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
