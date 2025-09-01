import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Current_user = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    return 'hi there';
  },
);
