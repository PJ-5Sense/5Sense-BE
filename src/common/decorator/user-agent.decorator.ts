import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * @description User Agent 정보 추출
 *
 */
export const ReqHeader = createParamDecorator((data: 'user-agent', context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  return req.headers['user-agent'];
});
