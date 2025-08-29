import {
  Body,
  Controller,
  Param,
  Query,
  Req,
  Delete,
  Patch,
  NotFoundException,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { UsersDTO } from './users.dto';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Updatedto } from './update.dto';
import { SerlizationInterceptor } from '../interceptor/serlization.interceptor';
import { Show_userDTO } from './show_users.dto';
import { Serlization } from '../interceptor/serlization.interceptor';
import { AuthService } from './auth.service';
@Controller('auth')
@Serlization(Show_userDTO)
export class UsersController {
  constructor(
    private user: UsersService,
    private auth: AuthService,
  ) {}
  @Post('/signup')
  createUser(@Body() body: UsersDTO) {
    console.log(body);
    return this.auth.signup(body.email, body.password);
  }

  @Post('/signin')
  CreateSign(@Body() body: UsersDTO) {
    console.log('this is signin');
    console.log(body);
    return this.auth.signin(body.email, body.password);
  }
  // @UseInterceptors(new SerlizationInterceptor(Show_userDTO))
  // instead of using the decorator that is interceptors  we create the function in the serlizers and we use that here.
  // @Serlization(Show_userDTO)
  // instead of applying for this we will apply all this controller
  @Get(':id')
  findOneUser(@Param('id') id: string) {
    console.log(id);
    return this.user.findone(parseInt(id));
  }
  @Get()
  findalluser(@Query('email') email: string, @Req() req: Request) {
    console.log(email, req.path);
    return this.user.find(email);
  }
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    console.log(id);
    return this.user.remove(parseInt(id));
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: Updatedto) {
    return this.user.update(parseInt(id), body);
  }
}
