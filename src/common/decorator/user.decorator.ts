import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload } from 'src/feature-modules/auth/type/jwt-payload.type';

/**
 * @description Auth Guard에서 추출된 JWT Token의 Payload에 인증된 사용자의 정보를 추출하는 Decorator
 * @see /src/common/guards/jwt.guard.ts
 */
export const CurrentUser = createParamDecorator((data: keyof JwtPayload | undefined, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  if (data) return req.user[data];
  return req.user;
});
