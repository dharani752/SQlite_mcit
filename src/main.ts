import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomInterceptor } from './users/interceptor/Custom_decorator_interceptor';
import { UsersService } from './users/users.service';
const cookiesession = require('cookie-session');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new cookiesession({ keys: ['qwert'] }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
   app.useGlobalInterceptors(new CustomInterceptor(app.get(UsersService)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
