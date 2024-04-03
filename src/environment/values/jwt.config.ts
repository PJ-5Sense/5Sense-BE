import { IsString } from 'class-validator';
import ValidateConfig from '../environment.validator';
import { getValue } from '../aws-parameter-store';

class JwtConfig {
  @IsString()
  JWT_ACCESS_EXPIRE_TIME: string;

  @IsString()
  JWT_REFRESH_EXPIRE_TIME: string;

  @IsString()
  JWT_ACCESS_SECRET_KEY: string;

  @IsString()
  JWT_REFRESH_SECRET_KEY: string;
}

export type JwtOptions = {
  access: JwtTokenSettings;
  refresh: JwtTokenSettings;
};

type JwtTokenSettings = { secret: string; expiresIn: string };

export default async () => {
  let env = {
    JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
    JWT_ACCESS_EXPIRE_TIME: process.env.JWT_ACCESS_EXPIRE_TIME,
    JWT_REFRESH_EXPIRE_TIME: process.env.JWT_REFRESH_EXPIRE_TIME,
  };

  if (process.env.NODE_ENV !== 'local') {
    env = await getValue('jwt-options');
  }

  ValidateConfig(env, JwtConfig);

  return {
    JWT_OPTIONS: {
      access: { secret: env.JWT_ACCESS_SECRET_KEY, expiresIn: env.JWT_ACCESS_EXPIRE_TIME },
      refresh: { secret: env.JWT_REFRESH_SECRET_KEY, expiresIn: env.JWT_REFRESH_EXPIRE_TIME },
    },
  };
};
