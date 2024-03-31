import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload } from 'src/auth/type/jwt-payload.type';

/**
 * @description Auth Guard에서 추출된 JWT Token의 Payload를 사용할 수 있도록 함
 * @see /src/common/guards/jwt.guard.ts
 */
export const User = createParamDecorator((data: keyof JwtPayload | undefined, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  if (data) return req.user[data];
  return req.user;
});
