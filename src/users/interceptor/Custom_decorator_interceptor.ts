import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

export class CustomInterceptor implements NestInterceptor {
  constructor(private service: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { Id } = request.session || {};
    console.log(Id);

    if (Id) {
      const finding_user = await this.service.findone(Id);
      request.currentUser = finding_user;
    }

    return next.handle(); 
  }
}
