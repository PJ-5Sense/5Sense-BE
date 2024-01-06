import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth-jwt.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockReflector = {
    getAllAndOverride: jest.fn(publicKey => publicKey === IS_PUBLIC_KEY),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
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
  });
});
