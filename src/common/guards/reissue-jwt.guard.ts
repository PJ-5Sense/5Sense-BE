import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

/**
 * JWT Access Token을 재발급 하기위해서 Refresh Token의 유효성 검사를 하는 가드
 *
 */
@Injectable()
export class ReissueGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('The token does not exist');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_OPTIONS.refresh.secret'),
      });

      request['user'] = payload;
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        if (e.name === 'TokenExpiredError')
          throw new UnauthorizedException('The token has expired and you must log in again');

        throw new UnauthorizedException('The token is invalid. You must log in again');
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
