import { IsString } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class KaKaoConfig {
  @IsString()
  client_id: string;

  @IsString()
  client_secret: string;

  @IsString()
  redirect_uri: string;
}
export default () => {
  const env = {
    client_id: process.env.KAKAO_CLIENT_ID,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
    redirect_uri: process.env.CALLBACK_URL,
  };

  ValidateConfig(env, KaKaoConfig);

  return { KAKAO: env };
};
