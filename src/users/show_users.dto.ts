import { Expose } from 'class-transformer';
export class Show_userDTO {
  @Expose()
  email: string;
  @Expose()
  id: number;
}
