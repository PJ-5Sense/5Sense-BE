import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { Reflector } from '@nestjs/core';

/**
 * JWT Token에 대한 유효성 검사하는 가드이며, 글로벌로 적용되어있음
 *
 * @description 가드 유효성 검사를 Pass하기 위해서는 '@Public' decorator를 적용하지 않을 메소드에 사용
 * @see   /src/common/public.decorator
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('The token does not exist');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_OPTIONS.access.secret'),
      });

      request['user'] = payload;
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        if (e.name === 'TokenExpiredError') throw new UnauthorizedException('The token time has expired');

        throw new UnauthorizedException('Invalid token');
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
