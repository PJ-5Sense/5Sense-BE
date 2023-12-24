import { IsString } from 'class-validator';
import ValidateConfig from '../environment.validator';

class KaKaoConfig {
  @IsString()
  KAKAO_CLIENT_ID: string;

  @IsString()
  KAKAO_CLIENT_SECRET: string;

  @IsString()
  KAKAO_CALLBACK_URL: string;
}
export default () => {
  const env = {
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    KAKAO_CALLBACK_URL: process.env.KAKAO_CALLBACK_URL,
  };

  ValidateConfig(env, KaKaoConfig);

  return {
    KAKAO_CONFIG: {
      client_id: env.KAKAO_CLIENT_ID,
      client_secret: env.KAKAO_CLIENT_SECRET,
      redirect_uri: env.KAKAO_CALLBACK_URL,
    },
  };
};
