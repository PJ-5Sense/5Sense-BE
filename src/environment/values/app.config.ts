import { IsIn, IsInt, Max, Min } from 'class-validator';
import ValidateConfig from '../environment.validator';

class AppConfig {
  @IsIn(['local', 'debug', 'test', 'development', 'production'])
  NODE_ENV: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  PORT: number;
}

export default () => {
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.APP_PORT,
  };

  ValidateConfig(env, AppConfig);

  return { APP: env };
};
