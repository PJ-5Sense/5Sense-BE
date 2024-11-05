import { ConfigService } from '@nestjs/config';
import { SocialLoginStrategy } from './social-login-strategy.interface';
import { Injectable } from '@nestjs/common';
import { SocialLogin } from '../type/social-login.type';
import { SocialType } from '../type/social.type';
import axios from 'axios';
import { SocialConfig } from '../type/social-config.type';

@Injectable()
export class NaverLoginStrategy implements SocialLoginStrategy {
  constructor(private readonly configService: ConfigService) {}

  async login(code: string, state: string): Promise<SocialLogin> {
    const { accessToken, refreshToken } = await this.getToken(code, state);
    const socialUserInfo = await this.getUserInfo(accessToken);

    return { accessToken, refreshToken, socialUserInfo };
  }

  /**
   * https://developers.naver.com/docs/login/devguide/devguide.md#3-4-4-%EC%A0%91%EA%B7%BC-%ED%86%A0%ED%81%B0-%EB%B0%9C%EA%B8%89-%EC%9A%94%EC%B2%AD
   *
   * 프론트에서 네이버 로그인 요청에 사용한 state 정보와 요청의 응답에서 발급해주는 인가코드를 사용해 네이버 측에게 유저 정보를 얻을 수 있는 토큰을 받아 리턴하는 함수
   * @param code 네이버에서 발급해준 인가코드
   * @param state 네이버에서 인가코드를 발급할 때 식별자로 사용되는 고유 값
   * @returns 인가코드를 이용하여 발급받은 accessToken, refreshToken을 리턴함
   */
  private async getToken(code: string, state: string) {
    const { client_id, client_secret, redirect_uri }: SocialConfig = this.configService.get('NAVER_CONFIG');

    const naverToken = (await axios.post(
      `https://nid.naver.com/oauth2.0/token?` +
        `code=${code}&` +
        `grant_type=authorization_code&` +
        `state=${state}&` +
        `client_id=${client_id}&` +
        `client_secret=${client_secret}&` +
        `redirect_uri=${redirect_uri}`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )) as { data: { access_token: string; refresh_token: string } };

    return { accessToken: naverToken.data.access_token, refreshToken: naverToken.data.refresh_token };
  }

  /**
   * https://developers.naver.com/docs/login/devguide/devguide.md#3-4-5-%EC%A0%91%EA%B7%BC-%ED%86%A0%ED%81%B0%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%ED%94%84%EB%A1%9C%ED%95%84-api-%ED%98%B8%EC%B6%9C%ED%95%98%EA%B8%B0
   *
   * 네이버 엑세스 토큰을 활용하여 유저 정보를 가져오는 함수
   * @param naverAccessToken 네이버에서 제공하는 엑세스 토큰
   * @returns
   */
  private async getUserInfo(naverAccessToken: string): Promise<{
    socialId: string;
    email: string | null;
    phone: string | null;
    profile: string;
    name: string;
    socialType: SocialType;
  }> {
    const naverUser = (await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${naverAccessToken}`,
      },
    })) as {
      data: {
        response: {
          id: string;
          name: string;
          profile_image: string;
          email: string;
          phone: string;
        };
      };
    };

    return {
      socialId: naverUser.data.response.id.toString(),
      email: naverUser.data.response.email,
      name: naverUser.data.response.name,
      profile: naverUser.data.response.profile_image,
      phone: naverUser.data.response?.phone,
      socialType: SocialType.Naver,
    };
  }

  async disconnect(socialId: string): Promise<void> {}
}
