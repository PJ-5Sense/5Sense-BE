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
import { AuthEntity } from './entities/auth.entity';
import { CreateAuthDto } from './types/create-auth.dto';

@Injectable()
export class AuthService implements IAuthService {
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

  async socialLogin(
    provider: SocialType,
    code: string,
    state: string,
    userAgent: string,
  ): Promise<{ accessToken: string; refreshToken: string; accessTokenExp: Date }> {
    const strategy = this.strategies.get(provider);
    if (!strategy) {
      throw new InternalServerErrorException(`Unsupported social login provider: ${provider}`);
    }

    const socialLoginInfo = await strategy.login(code, state);
    const userSocialInfo = await this.authDao.findOneBySocialId(
      socialLoginInfo.socialUserInfo.socialId,
      provider,
      userAgent,
    );

    // 존재하지 않을 경우, 소셜로그인 정보 저장과 유저 정보를 저장한다.
    if (!userSocialInfo) return await this.processNewUserAndGenerateTokens(socialLoginInfo, userAgent);
    else
      return await this.processExistingUserAndGenerateTokens(
        userSocialInfo,
        userAgent,
        socialLoginInfo.accessToken,
        socialLoginInfo.refreshToken,
      );
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
    const newUser = await this.userService.create({
      profile: socialLoginInfo.socialUserInfo.profile,
      name: socialLoginInfo.socialUserInfo.name,
      email: socialLoginInfo.socialUserInfo.email,
      phone: socialLoginInfo.socialUserInfo.phone,
    });

    const refreshToken = await this.generateRefreshToken({
      userId: Number(newUser.id),
      socialId: socialLoginInfo.socialUserInfo.socialId,
      centerId: null,
      socialType: socialLoginInfo.socialUserInfo.socialType,
    });

    await this.authDao.createOrUpdate({
      socialId: socialLoginInfo.socialUserInfo.socialId,
      socialType: socialLoginInfo.socialUserInfo.socialType,
      socialAccessToken: socialLoginInfo.accessToken,
      socialRefreshToken: socialLoginInfo.refreshToken,
      appRefreshToken: refreshToken,
      userId: newUser.id,
      userAgent,
    });

    const accessToken = await this.generateAccessToken({
      userId: Number(newUser.id),
      socialId: socialLoginInfo.socialUserInfo.socialId,
      centerId: null,
      socialType: socialLoginInfo.socialUserInfo.socialType,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExp: new Date((await this.jwtService.decode(accessToken))['exp'] * 1000),
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
  private async processExistingUserAndGenerateTokens(
    userSocialInfo: AuthEntity,
    userAgent: string,
    socialAccessToken: string,
    socialRefreshToken: string,
  ) {
    // 센터는 하나만 등록되도록 되어있던가, 여러개의 센터일 경우 센터를 선택해서 로그인 하도록 해야함 ( 12/24 )
    const centerId = await this.userService.findOneUserCenterByUserId(userSocialInfo.userId);
    const refreshToken = await this.generateRefreshToken({
      userId: Number(userSocialInfo.userId),
      socialId: userSocialInfo.socialId,
      centerId,
      socialType: userSocialInfo.socialType,
    });

    const socialData: CreateAuthDto = {
      socialId: userSocialInfo.socialId,
      socialType: userSocialInfo.socialType,
      socialAccessToken,
      socialRefreshToken,
      appRefreshToken: refreshToken,
      userAgent,
    };

    if (userAgent === userSocialInfo.userAgent) socialData['id'] = userSocialInfo.id;
    else socialData['userId'] = userSocialInfo.userId;

    await this.authDao.createOrUpdate(socialData);

    const accessToken = await this.generateAccessToken({
      userId: Number(userSocialInfo.userId),
      socialId: userSocialInfo.socialId,
      centerId,
      socialType: userSocialInfo.socialType,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExp: new Date((await this.jwtService.decode(accessToken))['exp'] * 1000),
    };
  }

  async reissueAccessToken(userAgent: string, refreshToken: string, jwtInfo: JwtPayload) {
    const userSocialData = await this.authDao.findOneBySocialId(jwtInfo.socialId, jwtInfo.socialType, userAgent);
    const [type, token] = refreshToken.split(' ');

    if (type !== 'Bearer' || userSocialData.appRefreshToken !== token || userAgent !== userSocialData.userAgent) {
      throw new UnauthorizedException('Invalid Refresh Token, you need to check');
    }

    const accessToken = await this.generateAccessToken({
      userId: Number(userSocialData.userId),
      socialId: userSocialData.socialId,
      centerId: await this.userService.findOneUserCenterByUserId(userSocialData.userId),
      socialType: userSocialData.socialType,
    });

    return {
      accessToken,
      accessTokenExp: new Date((await this.jwtService.decode(accessToken)['exp']) * 1000),
    };
  }
}
