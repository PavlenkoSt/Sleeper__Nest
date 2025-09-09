import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../dto';

const getCurrentUserByContext = (ctx: ExecutionContext): UserDto => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserDto;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
