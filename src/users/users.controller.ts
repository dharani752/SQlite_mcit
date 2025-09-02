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
  Session,
  UseGuards,
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
import { Current_user } from './decorators/current_decorator';
import { AuthGuards } from 'src/guards/auth.guards';
@Controller('auth')
@Serlization(Show_userDTO)
export class UsersController {
  constructor(
    private user: UsersService,
    private auth: AuthService,
  ) {}
  @Post('/signup')
  async createUser(
    @Body() body: UsersDTO,
    @Session() session: any,
    @Req() req: any,
  ) {
    const user = await this.auth.signup(body.email, body.password);
    session.Id = user.id;
    return user.id;
  }

  @Post('/signin')
  async CreateSign(
    @Body() body: UsersDTO,
    @Session() session: any,
    @Req() req: any,
  ) {
    const user = await this.auth.signin(body.email, body.password);
    session.Id = user.id;
    console.log(session);
    return user.id;
  }

  @Post('siginout')
  signout(@Session() session: any) {
    console.log(session);
    session.Id = null;
    return 'signout';
  }

  @Get('whoiam')
  @UseGuards(AuthGuards)
  who_i_am(@Current_user() user: any) {
    console.log(user);
    return user;
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
