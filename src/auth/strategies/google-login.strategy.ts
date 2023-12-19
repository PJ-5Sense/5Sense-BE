import { ConfigService } from '@nestjs/config';
import { SocialLoginStrategy } from './social-login-strategy.interface';
import { Injectable } from '@nestjs/common';
import { SocialLogin } from '../types/social-login.type';
import { GoogleConfig } from 'src/environment/values/google.config';
import { GoogleRequireData } from '../types/get-google-token.type';
import axios from 'axios';
import { SocialType } from '../types/social.type';

@Injectable()
export class GoogleLoginStrategy implements SocialLoginStrategy {
  constructor(private readonly configService: ConfigService) {}

  async login(code: string, state: string): Promise<SocialLogin> {
    const { accessToken, refreshToken } = await this.getGoogleToken(code, state);
    const socialUserInfo = await this.getGoogleUserInfo(accessToken);

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
  private async getGoogleToken(code: string, state: string) {
    const { client_id, client_secret, redirect_uri }: GoogleConfig = this.configService.get('GOOGLE');

    const googleRequireData: GoogleRequireData = {
      grant_type: 'authorization_code',
      state,
      code,
      client_id,
      client_secret,
      redirect_uri,
    };

    const GoogleToken = (await axios.post('https://oauth2.googleapis.com/token', googleRequireData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })) as { data: { access_token: string; refresh_token: string } };

    return { accessToken: GoogleToken.data.access_token, refreshToken: GoogleToken.data.refresh_token };
  }

  private async getGoogleUserInfo(googleAccessToken: string): Promise<{
    socialId: string;
    email: string;
    profile: string;
    name: string;
    socialType: SocialType;
  }> {
    const googleUser = (await axios.get('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    })) as {
      id: number;
      email: string;
      picture: string;
      name: string;
    };
    // 구글 응답값 확인해야함
    return {
      socialId: googleUser.id.toString(),
      email: googleUser.email,
      name: googleUser.name,
      profile: googleUser.picture,
      socialType: SocialType.Google,
    };
  }
}
