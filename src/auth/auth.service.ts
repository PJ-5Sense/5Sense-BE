import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SocialType } from './types/social.type';
import { JwtService } from '@nestjs/jwt';
import { KakaoLoginStrategy } from './strategies/kakao-login.strategy';
import { SocialLoginStrategy } from './strategies/social-login-strategy.interface';
import { IUserService, USER_SERVICE } from 'src/user/user.service.interface';
import { IAuthService } from './auth.service.interface';
import { AUTH_DAO, IAuthDao } from './dao/auth.dao.interface';
import { GoogleLoginStrategy } from './strategies/google-login.strategy';
import { NaverLoginStrategy } from './strategies/naver-login.strategy';
import { JwtPayload } from './types/jwt-payload.type';
import { ConfigService } from '@nestjs/config';
import { JwtOptions } from 'src/environment/values/jwt.config';
import { SocialLogin } from './types/social-login.type';
import { CreateAuthDto } from './types/create-auth.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthServiceImpl implements IAuthService {
  private strategies: Map<SocialType, SocialLoginStrategy>;
  private readonly jwtOptions: JwtOptions;

  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    @Inject(AUTH_DAO) private readonly authDao: IAuthDao,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly kakaoStrategy: KakaoLoginStrategy,
    private readonly googleStrategy: GoogleLoginStrategy,
    private readonly naverStrategy: NaverLoginStrategy,
  ) {
    this.strategies = new Map<SocialType, SocialLoginStrategy>([
      [SocialType.Kakao, this.kakaoStrategy],
      [SocialType.Naver, this.naverStrategy],
      [SocialType.Google, this.googleStrategy],
    ]);

    const jwtOptions: JwtOptions = this.configService.get('JWT_OPTIONS');

    this.jwtOptions = jwtOptions;
  }

  async socialLogin(provider: SocialType, code: string, state: string, userAgent: string) {
    const strategy = this.strategies.get(provider);
    if (!strategy) {
      throw new InternalServerErrorException(`Unsupported social login provider: ${provider}`);
    }

    const socialLoginInfo = await strategy.login(code, state);

    const userSocialInfo = await this.userService.findUserBySocialId(socialLoginInfo.socialUserInfo.socialId, provider);

    if (!userSocialInfo) {
      return await this.processNewUserAndGenerateTokens(socialLoginInfo, userAgent);
    } else {
      return await this.processExistingUserAndGenerateTokens(userSocialInfo, userAgent);
    }
  }

  private async generateAccessToken(payload: JwtPayload): Promise<string> {
    const accessToken = await this.jwtService.signAsync({ ...payload }, { ...this.jwtOptions.access });

    return accessToken;
  }

  private async generateRefreshToken(payload: JwtPayload): Promise<string> {
    const refreshToken = await this.jwtService.signAsync({ ...payload }, { ...this.jwtOptions.refresh });

    return refreshToken;
  }

  /**
   * 유저 정보와 소셜 인증 정보를 등록하고 토큰을 생성
   *
   * @param socialLoginInfo 유저정보와 소셜 인증 정보
   * @param userAgent 디바이스 정보
   * @returns
   */
  private async processNewUserAndGenerateTokens(socialLoginInfo: SocialLogin, userAgent: string) {
    const user = {
      profile: socialLoginInfo.socialUserInfo.profile,
      name: socialLoginInfo.socialUserInfo.name,
      email: socialLoginInfo.socialUserInfo.email,
      phone: socialLoginInfo.socialUserInfo.phone,
    };
    const social = {
      socialId: socialLoginInfo.socialUserInfo.socialId,
      socialType: socialLoginInfo.socialUserInfo.socialType,
      socialAccessToken: socialLoginInfo.accessToken,
      socialRefreshToken: socialLoginInfo.refreshToken,
    };

    const newUser = await this.userService.createUser(user, social);

    const refreshToken = await this.generateRefreshToken({
      userId: Number(newUser.id),
      centerId: null,
    });

    await this.authDao.createOrUpdate({
      appRefreshToken: refreshToken,
      userId: newUser.id,
      userAgent,
    });

    const accessToken = await this.generateAccessToken({
      userId: Number(newUser.id),
      centerId: null,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExp: new Date((await this.jwtService.decode(accessToken))['exp'] * 1000),
      hasCenter: false,
      isNew: true,
    };
  }

  /**
   * 기존 유저는 소셜 인증 정보(Social Tokens, App Refresh Token)
   * @param userSocialInfo
   * @param userAgent
   * @param socialAccessToken
   * @param socialRefreshToken
   * @returns
   */
  private async processExistingUserAndGenerateTokens(user: UserEntity, userAgent: string) {
    const centerId = user.centers[0]?.id ?? null;
    const authInfo = await this.authDao.findOneByUserAgent(user.id, userAgent);

    const refreshToken = await this.generateRefreshToken({
      userId: user.id,
      centerId,
    });

    const social: CreateAuthDto = {
      userId: user.id,
      appRefreshToken: refreshToken,
      userAgent: userAgent,
    };

    if (authInfo?.userAgent === userAgent) {
      social['id'] = authInfo.id;
    }

    await this.authDao.createOrUpdate(social);

    const accessToken = await this.generateAccessToken({
      userId: user.id,
      centerId,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExp: new Date((await this.jwtService.decode(accessToken))['exp'] * 1000),
      hasCenter: !centerId ? false : true,
      isNew: false,
    };
  }

  async reissueAccessToken(userAgent: string, refreshToken: string, jwtInfo: JwtPayload) {
    const userSocialData = await this.authDao.findOneByUserAgent(jwtInfo.userId, userAgent);
    const token = refreshToken.split(' ')[1];

    if (!userSocialData || userSocialData.appRefreshToken !== token) {
      throw new UnauthorizedException('Invalid Refresh Token, you need to check');
    }

    const accessToken = await this.generateAccessToken({
      userId: userSocialData.userId,
      centerId: (await this.userService.findOne(userSocialData.userId)).centers[0]?.id ?? null,
    });

    return {
      accessToken,
      accessTokenExp: new Date((await this.jwtService.decode(accessToken)['exp']) * 1000),
    };
  }
}
