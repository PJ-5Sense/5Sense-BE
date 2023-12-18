import { SocialLogin } from './../types/social-login.type';
// kakao-login.strategy.ts
import { ConfigService } from '@nestjs/config';
import { SocialLoginStrategy } from './social-login-strategy.interface';
import { Injectable } from '@nestjs/common';
import { KaKaoConfig } from 'src/environment/values/kakao.config';
import { KaKaoRequireData } from '../types/get-kakao-token.type';
import axios from 'axios';
import { SocialType } from '../types/social.type';
// 다른 필요한 import 구문들...

@Injectable()
export class KakaoLoginStrategy implements SocialLoginStrategy {
  // 필요한 서비스 주입...
  constructor(private readonly configService: ConfigService) {}

  async login(code: string, state: string): Promise<SocialLogin> {
    const { accessToken, refreshToken } = await this.getKakaoToken(code, state);
    const socialUserInfo = await this.getKakaoUserInfo(accessToken);

    return { accessToken, refreshToken, socialUserInfo };
  }

  /**
   *  https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
   *
   *  프론트에서 카카오 로그인 요청에 사용한 state 정보와 요청의 응답에서 발급해주는 인가코드를 사용해 카카오 측에게 유저 정보를 얻을 수 있는 토큰을 받아 리턴하는 함수
   *
   * @param code 카카오에서 발급해준 인가코드
   * @param state 카카오에서 인가코드를 발급할 때 식별자로 사용되는 고유 값
   * @returns 인가코드를 이용하여 발급받은 accessToken, refreshToken을 리턴함
   */
  private async getKakaoToken(code: string, state: string): Promise<{ accessToken: string; refreshToken: string }> {
    const { client_id, client_secret, redirect_uri }: KaKaoConfig = this.configService.get('KAKAO');

    const kaKaoRequireData: KaKaoRequireData = {
      grant_type: 'authorization_code',
      state,
      code,
      client_id,
      client_secret,
      redirect_uri,
    };

    const KaKaoToken = (await axios.post('https://kauth.kakao.com/oauth/token', kaKaoRequireData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })) as { data: { access_token: string; refresh_token: string } };

    return { accessToken: KaKaoToken.data.access_token, refreshToken: KaKaoToken.data.refresh_token };
  }

  /**
   *  https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
   *
   *  카카오 엑세스 토큰을 이용해 유저 정보를 받아 리턴하는 함수
   *
   * @param kakaoAccessToken 카카오에서 제공하는 액세스 토큰
   * @returns
   */
  private async getKakaoUserInfo(kakaoAccessToken: string): Promise<{
    socialId: string;
    email: string;
    profile: string;
    name: string;
    socialType: SocialType;
  }> {
    const kakaoUser = (await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    })) as {
      data: {
        id: number;
        kakao_account: { email: string; profile: { thumbnail_image_url: string; nickname: string } };
      };
    };

    return {
      socialId: kakaoUser.data.id.toString(),
      email: kakaoUser.data.kakao_account.email,
      name: kakaoUser.data.kakao_account.profile.nickname,
      profile: kakaoUser.data.kakao_account.profile.thumbnail_image_url,
      socialType: SocialType.Kakao,
    };
  }
}