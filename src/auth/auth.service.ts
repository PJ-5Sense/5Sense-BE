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
import { SocialLogin, SocialUserInfo } from './types/social-login.type';
import { AuthEntity } from './entities/auth.entity';
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
    // 유저 정보 확인
    // 유저 정보 yes . 인증 정보 조회 -> 인증 정보는 디바이스와 유저아이디로 확인
    // 인증 정보 yes . 인증 정보에 리프레쉬 토큰 새로 박아준다.
    // 유저 정보 no . 유저 생성, 소셜 데이터 생성, 인증 데이터 생성
    // 2주가 지난 정보 (13일 되는 인증 정보는 삭제 - 스케줄러), 2주가 안된 정보는 유지 계속 사용
    // (유저 <-> 소셜), 인증 테이블 세개 구성
    // 소셜 정보를 가진게 있는지 확인
    // 가지고 있으면 유저정보로 인증 정보를 생성
    // 인증 정보가 미리 존재한다면?
    // 현재 우리는 디바이스 관리가 없다. 아무쪽에서 로그인해도 문제가 되지 않음
    // 로그아웃시 데이터를 삭제하는게 아니라 인증정보 관련된 필드를 지우면 된다.
    // 인증 정보가 존재할 경우, 라스트 로그인을 기록해두고 라스트 로그인이 2주가 지나면 삭제

    // 여러개의 디바이스에서 로그인이 가능
    // 디바이스를 관리하는 기능은 없으나 내부적으로는 디바이스 별로 인증 정보가 생성됨
    // 인증 정보는 리프레쉬 토큰이며 해당 토큰은 엑세스토큰을 재발급하는데 사용됨, ( 로그아웃 시 리프레쉬토큰과 소셜로그인 리프레쉬, 엑세스 삭제해야함 )
    // 소셜로그인은 멀티 디바이스가 가능하다고 함, 인증 정보는 그러면 멀티 디바이스 관련된 정보를 기록해야하는 것 아닌가 ?
    // 소셜 테이블은 소셜로그인 아이디, 소셜로그인 타입, 유저 아이디만 구성
    // 인증 테이블은 소셜로그인 타입, 소셜로그인 토큰(엑,리), 유저 아이디
    // 인증 테이블은 인증정보를 다룬다.
    // 인증 테이블에서 인증정보는 어떤 디바이스로 로그인했는가, ( 다른카카오톡으로 들어가고싶어요? -> 카카오톡 로그인을 해제해야함, but 그럴이유가 ?)
    // 소셜로그인에서 리프레쉬 토큰과 엑세스 토큰을 저장할 이유가 딱히 없음
    // 인증 테이블에서는 리프레쉬 토큰과 디바이스 정보, 유저 정보가 남아있음

    // 인증 테이블은 로그인 시 리프레쉬 토큰과 디바이스 정보, 유저 정보를 저장한다. -> 로그인에서는 소셜 아이디로 유저를 분별하고 처리한다.
    // 로그인 시 인증 정보가 존재하는 경우(애초에 엑세스 토큰이 존재하면 그것을 인증으로 던지고 실패하면 리프레쉬로 다시 가져오면 됨), 로그아웃으로 리프레쉬 토큰을 지웠기 때문에, 디바이스 정보로 조회 일치 할 시, 리프레쉬 토큰 업데이트
    const userSocialInfo = await this.userService.findUserBySocialId(socialLoginInfo.socialUserInfo.socialId, provider);

    // 사용자 접속 환경이 달라서 정보가 안나왔을 수 있으므로 소셜아이디 정보가 있는지 확인한다.
    // if (!userSocialInfo)
    // userSocialInfo = await this.authDao.findOnSocialId(socialLoginInfo.socialUserInfo.socialId, provider);

    if (!userSocialInfo) {
      return await this.processNewUserAndGenerateTokens(socialLoginInfo, userAgent);
    } else {
      return await this.processExistingUserAndGenerateTokens(userSocialInfo, socialLoginInfo, userAgent);
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
  private async processExistingUserAndGenerateTokens(
    user: UserEntity,
    socialLoginInfo: SocialLogin,
    userAgent: string,
  ) {
    // 유저와 소셜정보가 존재할 경우에는 인증 정보만 추가하면 됨
    // 유저정보를 확인
    // 센터는 하나만 등록되도록 되어있던가, 여러개의 센터일 경우 센터를 선택해서 로그인 하도록 해야함 ( 12/24 )
    // auth 인증 데이터 생성하기 직전에 졸려서 잠
    //auth에 저장할 리프레쉬 토큰이고, userAgent와 userId로 인증정보가 존재하는지 먼저확인할거임(0215)
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
