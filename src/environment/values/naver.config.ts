import { IsString } from 'class-validator';
import ValidateConfig from '../environment.validator';

class NaverConfig {
  @IsString()
  NAVER_CLIENT_ID: string;

  @IsString()
  NAVER_CLIENT_SECRET: string;

  @IsString()
  NAVER_CALLBACK_URL: string;
}
export default () => {
  const env = {
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
    NAVER_CALLBACK_URL: process.env.NAVER_CALLBACK_URL,
  };

  ValidateConfig(env, NaverConfig);

  return {
    NAVER_CONFIG: {
      client_id: env.NAVER_CLIENT_ID,
      client_secret: env.NAVER_CLIENT_SECRET,
      redirect_uri: env.NAVER_CALLBACK_URL,
    },
  };
};
