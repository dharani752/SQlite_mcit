import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { NotFoundError } from 'rxjs';

/* scrypt is the asyncronous function. but it will not return the promise it will deal with call backs.
 to make it return the promise we will use the  promisify  function from until  module*/

const scryto = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userservice: UsersService) {}
  async signup(email: string, password: any) {
    // see whether email is exist are not
    const users = await this.userservice.find(email);
    if (users.length) {
      throw new BadRequestException(' email is already exists');
    }
    // hashing the passowrd of the users //
    //1. generate the salt (16 characters length )
    const salt = randomBytes(8).toString('hex');

    // 2. combine a password and  salt
    // 3. hash the password and  salt
    const hashed_value = (await scryto(password, salt, 32)) as Buffer;
    const hashed_password = hashed_value.toString('hex');

    //4. Adding the  salt to the hashed value
    const result = salt + '.' + hashed_password;

    // 5.  and storing that hashed value and slat with the seperater
    const user = this.userservice.create(email, result);

    return user;
  }
  async signin(email: string, password: string) {
    const [users] = await this.userservice.find(email);
    if (!users) {
      throw new NotFoundException('email not found');
    } else {
      const [salt, storedhash] = users.password.split('.');
      const hashed_value = (await scryto(password, salt, 32)) as Buffer;
      if (!(storedhash == hashed_value.toString('hex'))) {
        throw new NotFoundException('Incorrect password');
      } else {
        return 'sucessfully login';
      }
    }
  }
}
