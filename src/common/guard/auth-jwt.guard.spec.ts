import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth-jwt.guard';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { ExecutionContext } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockReflector = {
    getAllAndOverride: jest.fn(publicKey => publicKey === IS_PUBLIC_KEY),
  };
  const mockJwtService = {
    verifyAsync: jest.fn((token: string) => {
      if (token === 'validToken') {
        // 유효한 토큰에 대한 payload 반환
        return Promise.resolve({ userId: 1, username: 'testUser' });
      } else {
        // 유효하지 않은 토큰에 대한 오류 발생
        throw new JsonWebTokenError('Invalid token');
      }
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('secret'),
          },
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard); // 가드만 실제 가드를 사용?
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('Guard Success', () => {
    it('Use "IS_PUBLIC_KEY" to pass through the JwtGuard if the role of the JwtGuard is not required', async () => {
      const context = {
        getClass: jest.fn(),
        getHandler: jest.fn(),
        switchToHttp: jest.fn(() => ({
          getRequest: jest.fn().mockReturnValue({
            headers: {
              authorization: '',
            },
          }),
        })),
      } as any;

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
      expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it('성공 토큰을 뭐라고하쥐 시부레?', async () => {
      const context = {
        getClass: jest.fn(),
        getHandler: jest.fn(),
        switchToHttp: jest.fn(() => ({
          getRequest: jest.fn().mockReturnValue({
            headers: {
              authorization: 'Bearer NotValidToken',
            },
          }),
        })),
      } as unknown as ExecutionContext;

      expect(await guard.canActivate(context)).toBe(true);
    });

    it('should deny access with an invalid token', async () => {
      const context = {
        getClass: jest.fn(),
        getHandler: jest.fn(),
        switchToHttp: jest.fn(() => ({
          getRequest: jest.fn().mockReturnValue({
            headers: {
              authorization: 'Bearer validToken',
            },
          }),
        })),
      } as unknown as ExecutionContext;
      await guard.canActivate(context);

      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith('validToken');
    });
  });
});
