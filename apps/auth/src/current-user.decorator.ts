import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './users/entities/user.entity';

const getCurrentUserByContext = (ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as User;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
