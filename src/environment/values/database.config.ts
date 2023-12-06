import { IsString, IsIn, IsNumber } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class DatabaseConfig {
  @IsString()
  database: string;

  @IsString()
  host: string;

  @IsString()
  password: string;

  @IsNumber()
  port: number;

  @IsIn(['mysql'])
  type: 'mysql';

  @IsString()
  logging: string;
}

export default () => {
  const isProduction = process.env.NODE_ENV === 'local' ? true : false;

  const env = {
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
    type: process.env.DATABASE_TYPE,
    username: process.env.DATABASE_USER,
    logging: isProduction,
    // synchronize: isProduction,
  };

  ValidateConfig(env, DatabaseConfig);

  return {
    DATABASE: env,
  };
};
