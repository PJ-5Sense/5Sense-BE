import { IsIn, IsInt, Max, Min } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class AppConfig {
  @IsIn(['local', 'development', 'production'])
  NODE_ENV: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  port: number;
}

export default () => {
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.APP_PORT,
  };

  ValidateConfig(env, AppConfig);

  return { APP: env };
};
