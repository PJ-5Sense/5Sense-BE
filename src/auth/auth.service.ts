import { Inject, Injectable } from '@nestjs/common';
import { SocialType } from './types/social.type';
import { JwtService } from '@nestjs/jwt';
import { KakaoLoginStrategy } from './strategies/kakao-login.strategy';
import { SocialLoginStrategy } from './strategies/social-login-strategy.interface';
import { IUserService, USER_SERVICE } from 'src/user/user.service.interface';
import { IAuthService } from './auth.service.interface';
import { AUTH_DAO, IAuthDao } from './dao/auth.dao.interface';
import { GoogleLoginStrategy } from './strategies/google-login.strategy';

@Injectable()
export class AuthService implements IAuthService {
  private strategies: Map<SocialType, SocialLoginStrategy>;

  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    @Inject(AUTH_DAO) private readonly authDao: IAuthDao,
    private readonly jwtService: JwtService,
    private readonly kakaoStrategy: KakaoLoginStrategy,
    private readonly googleStrategy: GoogleLoginStrategy,
  ) {
    this.strategies = new Map<SocialType, SocialLoginStrategy>([
      [SocialType.Kakao, this.kakaoStrategy],
      // [SocialType.Naver, this.naverStrategy],
      [SocialType.Google, this.googleStrategy],
    ]);
  }

  async socialLogin(
    provider: SocialType,
    code: string,
    state: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const strategy = this.strategies.get(provider);
    if (!strategy) {
      throw new Error(`Unsupported social login provider: ${provider}`);
    }

    const socialLoginResponse = await strategy.login(code, state);
    let user = await this.userService.findOneBySocialId(socialLoginResponse.socialUserInfo.socialId, provider);

    if (!user) {
      await this.authDao.createOrUpdate({
        socialId: socialLoginResponse.socialUserInfo.socialId,
        socialType: socialLoginResponse.socialUserInfo.socialType,
        socialAccessToken: null,
        socialRefreshToken: null,
        appRefreshToken: null,
      });

      user = await this.userService.create({
        profile: socialLoginResponse.socialUserInfo.profile,
        name: socialLoginResponse.socialUserInfo.name,
        email: socialLoginResponse.socialUserInfo.email,
        socialId: socialLoginResponse.socialUserInfo.socialId,
        centerId: null,
        phone: null,
      });
    }

    const { accessToken, refreshToken } = await this.generateJWtToken({
      userId: user.id,
      socialId: socialLoginResponse.socialUserInfo.socialId,
      centerId: user.centerId,
    });

    await this.authDao.createOrUpdate({
      socialId: socialLoginResponse.socialUserInfo.socialId,
      socialAccessToken: socialLoginResponse.accessToken,
      socialRefreshToken: socialLoginResponse.refreshToken,
      appRefreshToken: refreshToken,
      socialType: socialLoginResponse.socialUserInfo.socialType,
    });

    return { accessToken, refreshToken };
  }

  async generateJWtToken(payload: {
    userId: number;
    socialId: string;
    centerId: number;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}
