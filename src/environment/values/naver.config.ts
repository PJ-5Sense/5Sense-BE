import { IsString } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class NaverConfig {
  @IsString()
  client_id: string;

  @IsString()
  client_secret: string;

  @IsString()
  redirect_uri: string;
}
export default () => {
  const env = {
    client_id: process.env.NAVER_CLIENT_ID,
    client_secret: process.env.NAVER_CLIENT_SECRET,
    redirect_uri: process.env.NAVER_CALLBACK_URL,
  };

  ValidateConfig(env, NaverConfig);

  return { NAVER: env };
};
