import { IsString } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class GoogleConfig {
  @IsString()
  client_id: string;

  @IsString()
  client_secret: string;

  @IsString()
  redirect_uri: string;
}
export default () => {
  const env = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
  };

  ValidateConfig(env, GoogleConfig);

  return { GOOGLE: env };
};
