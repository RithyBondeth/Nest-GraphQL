import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthJwtUser } from '@app/common/utils/interfaces/auth-jwt-user.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const user = gqlContext.getContext().req.user as AuthJwtUser;
    return user;
  },
);
