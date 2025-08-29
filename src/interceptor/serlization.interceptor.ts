import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Show_userDTO } from 'src/users/show_users.dto';
export function Serlization(dto) {
  return UseInterceptors(new SerlizationInterceptor(dto));
}

export class SerlizationInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.log('it is excuted before the router handler');
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
