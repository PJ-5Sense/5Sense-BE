import { SocialLogin } from '../type/social-login.type';
import { ConfigService } from '@nestjs/config';
import { SocialLoginStrategy } from './social-login-strategy.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { KakaoRequireData } from '../type/get-kakao-token.type';
import axios from 'axios';
import { SocialType } from '../type/social.type';
import { SocialConfig } from '../type/social-config.type';

@Injectable()
export class KakaoLoginStrategy implements SocialLoginStrategy {
  constructor(private readonly configService: ConfigService) {}

  async login(code: string, state: string): Promise<SocialLogin> {
    const { accessToken, refreshToken } = await this.getToken(code, state);
    const socialUserInfo = await this.getUserInfo(accessToken);

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
  private async getToken(code: string, state: string): Promise<{ accessToken: string; refreshToken: string }> {
    const { client_id, client_secret, redirect_uri }: SocialConfig = this.configService.get('KAKAO_CONFIG');

    const kakaoRequireData: KakaoRequireData = {
      grant_type: 'authorization_code',
      state,
      code,
      client_id,
      client_secret,
      redirect_uri,
    };

    const kakaoToken = (await axios.post('https://kauth.kakao.com/oauth/token', kakaoRequireData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })) as { data: { access_token: string; refresh_token: string } };

    return { accessToken: kakaoToken.data.access_token, refreshToken: kakaoToken.data.refresh_token };
  }

  /**
   *  https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
   *
   *  카카오 엑세스 토큰을 이용해 유저 정보를 받아 리턴하는 함수
   *
   * @param kakaoAccessToken 카카오에서 제공하는 액세스 토큰
   * @returns
   */
  private async getUserInfo(kakaoAccessToken: string): Promise<{
    socialId: string;
    email: string | null;
    phone: string | null;
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
      email: kakaoUser.data.kakao_account?.email,
      name: kakaoUser.data.kakao_account.profile.nickname,
      profile: kakaoUser.data.kakao_account.profile.thumbnail_image_url,
      phone: null,
      socialType: SocialType.Kakao,
    };
  }

  async disconnect(socialId: string): Promise<void> {
    const { admin_key }: SocialConfig = this.configService.get('KAKAO_CONFIG');
    const unlink_res = await axios.post(
      'https://kapi.kakao.com/v1/user/unlink',
      {
        target_id_type: 'user_id',
        target_id: socialId,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'KakaoAK ' + admin_key,
        },
      },
    );

    const success = String(unlink_res.data.id) === String(socialId);

    if (!success) throw new InternalServerErrorException('소셜 플랫폼에서 회원정보 삭제 실패');
  }
}