import { AuthDao } from './dao/auth.dao';
import { Injectable } from '@nestjs/common';
import { SocialLoginType } from './types/social.type';
import { KakaoSocialConfig } from 'src/environment/values/kakao.config';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly authDao: AuthDao,
    private readonly userService: UserService,
  ) {}
  async socialLogin(type: SocialLoginType, code: string, state: string | null) {
    try {
      const { KAKAO_CLIENT_ID, CALLBACK_URL, KAKAO_CLIENT_SECRET }: KakaoSocialConfig = this.configService.get('KAKAO');
      // 토큰 받기
      const KaKaoData = {
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: CALLBACK_URL,
        state,
        code,
        client_secret: KAKAO_CLIENT_SECRET,
      };

      const response = (await axios.post('https://kauth.kakao.com/oauth/token', KaKaoData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })) as any;
      const KakaoToken = response.data.access_token;

      const userInfo = (await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${KakaoToken}`,
        },
      })) as any;
      console.log(userInfo.data.id);
      console.log(userInfo.data.profile.thumbnail_image_url);
      console.log(userInfo.data.kakao_account.profile.nickname);
      console.log(userInfo.data.kakao_account.email);
      console.log(userInfo.data);

      const exsitUser = await this.authDao.findOneBySocialId(userInfo.data.id);
      // 토큰 받은 후 유저 정보 받기
      console.log(exsitUser);
      if (!exsitUser) {
        await this.userService.create({
          profile: userInfo.data.profile.thumbnail_image_url,
          name: userInfo.data.kakao_account.profile.nickname,
          email: userInfo.data.kakao_account.email,
          phone: null,
        });
      } else {
        console.log('이미 존재하지않는데 무슨이링겨?');
      }
      // 유저 정보 받기 하고 유저정보 확인(로그인? 회원가입?)
      // state값도 유저정보에 저장하며 유저 정보에 state 넘겨주기
      // redirect front URL?state='wqeuqwekja'
      const data = { accessToken: 'af', refreshToken: 'rf' };
      return data;
    } catch (e) {
      console.log(e);

      return 'fail';
    }
  }
}
