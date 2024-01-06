import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE } from './auth.service.interface';

const mockAuthService = {
  socialLogin: jest.fn(),
  reissueAccessToken: jest.fn(),
};
const mockRefreshTokenGuard = { CanActivate: jest.fn(() => true) };
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AUTH_SERVICE, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
