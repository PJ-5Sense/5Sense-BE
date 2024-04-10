import { ConfigService } from '@nestjs/config';
import { SocialLoginStrategy } from './social-login-strategy.interface';
import { Injectable } from '@nestjs/common';
import { SocialLogin } from '../type/social-login.type';
import { SocialType } from '../type/social.type';
import axios from 'axios';
import { SocialConfig } from '../type/social-config.type';

@Injectable()
export class GoogleLoginStrategy implements SocialLoginStrategy {
  constructor(private readonly configService: ConfigService) {}

  async login(code: string, state: string): Promise<SocialLogin> {
    const { accessToken, refreshToken } = await this.getToken(code, state);
    const socialUserInfo = await this.getUserInfo(accessToken);

    return { accessToken, refreshToken, socialUserInfo };
  }

  /**
   * https://developers.google.com/identity/protocols/oauth2/web-server?hl=ko#exchange-authorization-code
   *
   * 프론트에서 구글 로그인 요청에 사용한 state 정보와 요청의 응답에서 발급해주는 인가코드를 사용해 구글 측에게 유저 정보를 얻을 수 있는 토큰을 받아 리턴하는 함수
   * @param code 구글에서 발급해준 인가코드
   * @param state 구글에서 인가코드를 발급할 때 식별자로 사용되는 고유 값
   * @returns 인가코드를 이용하여 발급받은 accessToken, refreshToken을 리턴함
   */
  private async getToken(code: string, state: string) {
    const { client_id, client_secret, redirect_uri }: SocialConfig = this.configService.get('GOOGLE_CONFIG');

    const googleToken = (await axios.post(
      `https://oauth2.googleapis.com/token?` +
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

    return { accessToken: googleToken.data.access_token, refreshToken: googleToken.data.refresh_token };
  }

  /**
   * 구글 엑세스 토큰을 이용해 유저 정보를 받아 리턴하는 함수
   *
   * @param googleAccessToken 구글에서 제공하는 엑세스 토큰
   * @returns
   */
  private async getUserInfo(googleAccessToken: string): Promise<{
    socialId: string;
    email: string | null;
    phone: string | null;
    profile: string;
    name: string;
    socialType: SocialType;
  }> {
    const googleUser = (await axios.get('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    })) as {
      data: {
        id: string;
        name: string;
        picture: string;
        email: string;
      };
    };

    return {
      socialId: googleUser.data.id.toString(),
      email: googleUser.data?.email,
      name: googleUser.data.name,
      profile: googleUser.data.picture,
      phone: null,
      socialType: SocialType.Google,
    };
  }
}
