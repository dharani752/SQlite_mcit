import { IsEmail, IsString, IsOptional } from 'class-validator';

export class Updatedto {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
}
