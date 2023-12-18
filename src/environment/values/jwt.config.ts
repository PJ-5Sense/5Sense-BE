import { IsString } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class JwtConfig {
  @IsString()
  secret: string;

  @IsString()
  expiresIn: string;
}

export default () => {
  const env = {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRE_TIME,
  };

  ValidateConfig(env, JwtConfig);

  return { JWT: { secret: env.secret, signOptions: { expiresIn: env.expiresIn } } };
};
