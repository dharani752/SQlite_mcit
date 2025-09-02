import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthService } from './auth.service';
import { CustomInterceptor } from './interceptor/Custom_decorator_interceptor';
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {}
