import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AdminService } from './app/admin/admin.service';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  const adminService = app.get(AdminService);
  adminService.create({
    username: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASSWORD,
  });
}
bootstrap();
