import { IsString } from 'class-validator';
import ValidateConfig from '../environment.validator';
import { getValue } from '../aws-parameter-store';

class GoogleConfig {
  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  GOOGLE_CALLBACK_URL: string;
}

export default async () => {
  let env = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  };

  if (process.env.NODE_ENV !== 'local') {
    env = await getValue('mysql-database');
  }

  ValidateConfig(env, GoogleConfig);

  return {
    GOOGLE_CONFIG: {
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: env.GOOGLE_CALLBACK_URL,
    },
  };
};
