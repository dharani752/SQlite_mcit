import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.entity';

import { AuthService } from './auth.service';
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {}
