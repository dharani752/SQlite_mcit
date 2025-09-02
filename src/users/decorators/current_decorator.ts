import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Current_user = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    console.log('hello i am custom decorator');
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
