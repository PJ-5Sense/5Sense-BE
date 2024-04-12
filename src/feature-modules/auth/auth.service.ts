import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SocialType } from './type/social.type';
import { JwtService } from '@nestjs/jwt';
import { KakaoLoginStrategy } from './strategy/kakao-login.strategy';
import { SocialLoginStrategy } from './strategy/social-login-strategy.interface';
import { GoogleLoginStrategy } from './strategy/google-login.strategy';
import { NaverLoginStrategy } from './strategy/naver-login.strategy';
import { JwtPayload } from './type/jwt-payload.type';
import { ConfigService } from '@nestjs/config';
import { JwtOptions } from 'src/common/environment/values/jwt.config';
import { SocialLogin } from './type/social-login.type';
import { CreateAuthDto } from './type/create-auth.dto';
import { UserEntity } from 'src/feature-modules/user/entity/user.entity';
import { UserService } from 'src/feature-modules/user/user.service';
import { AuthRepository } from './auth.repository';
import { CancelMembershipDTO } from './dto/request/cancelMembership.dto';
import { ResponseSocialLoginDTO } from './dto/response/social-login.dto';
import { ResponseReissueDTO } from './dto/response/reissue.dto';

@Injectable()
export class AuthService {
  private strategies: Map<SocialType, SocialLoginStrategy>;
  private readonly jwtOptions: JwtOptions;

  constructor(
    private readonly userService: UserService,
    private readonly authRepository: AuthRepository,
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

    let responseData;
    if (!userSocialInfo) {
      responseData = await this.processNewUserAndGenerateTokens(socialLoginInfo, userAgent);
    } else {
      responseData = await this.processExistingUserAndGenerateTokens(userSocialInfo, userAgent);
    }

    return new ResponseSocialLoginDTO(responseData);
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

    await this.authRepository.createOrUpdate({
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
    const authInfo = await this.authRepository.findOneByUserAgent(user.id, userAgent);

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

    await this.authRepository.createOrUpdate(social);

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
    const userSocialData = await this.authRepository.findOneByUserAgent(jwtInfo.userId, userAgent);
    const token = refreshToken.split(' ')[1];

    if (!userSocialData || userSocialData.appRefreshToken !== token) {
      throw new UnauthorizedException('Invalid Refresh Token, you need to check');
    }

    const accessToken = await this.generateAccessToken({
      userId: userSocialData.userId,
      centerId: (await this.userService.findOneById(userSocialData.userId)).centers[0]?.id ?? null,
    });

    return new ResponseReissueDTO({
      accessToken,
      accessTokenExp: new Date((await this.jwtService.decode(accessToken)['exp']) * 1000),
    });
  }

  async cancelMembership(cancelMembershipDTO: CancelMembershipDTO, userId: number) {
    const user = await this.userService.findOneById(userId);

    if (user.email === cancelMembershipDTO.email || user.phone === cancelMembershipDTO.phone) {
      const success = await this.userService.deleteUser(userId);

      if (success) {
        for (const social of user.socials) {
          const strategy = this.strategies.get(social.socialType);

          return await strategy.disconnect(social.socialId);
        }
      } else {
        throw new InternalServerErrorException('유저 정보 삭제에 실패했습니다.');
      }
    }

    throw new UnprocessableEntityException('삭제하기 위한 인증 정보가 일치하지 않습니다.');
  }
}
