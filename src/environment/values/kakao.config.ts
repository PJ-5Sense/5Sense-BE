import { IsString } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class KakaoSocialConfig {
  @IsString()
  KAKAO_CLIENT_ID: string;

  @IsString()
  KAKAO_CLIENT_SECRET: string;

  @IsString()
  CALLBACK_URL: string;
}
export default () => {
  const env = {
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
  };

  ValidateConfig(env, KakaoSocialConfig);

  return {
    KAKAO: env,
  };
};
