import { IsString, IsIn, IsNumber } from 'class-validator';
import ValidateConfig from '../environment.validator';
import { getValue } from '../aws-parameter-store';

class DatabaseConfig {
  @IsString()
  DATABASE_DB: string;

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_PASS: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsIn(['mysql'])
  DATABASE_TYPE: 'mysql';

  @IsString()
  DATABASE_USER: string;
}

export default async () => {
  let env = {
    DATABASE_DB: process.env.DATABASE_DB,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PASS: process.env.DATABASE_PASS,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_TYPE: process.env.DATABASE_TYPE,
    DATABASE_USER: process.env.DATABASE_USER,
  };

  const isProduction = process.env.NODE_ENV === 'local' ? true : false;

  if (process.env.NODE_ENV !== 'local') {
    env = await getValue('mysql-database');
  }

  ValidateConfig(env, DatabaseConfig);

  return {
    DATABASE: {
      database: env.DATABASE_DB,
      host: env.DATABASE_HOST,
      password: env.DATABASE_PASS,
      port: env.DATABASE_PORT,
      type: env.DATABASE_TYPE,
      username: env.DATABASE_USER,
      // logging: isProduction,
      synchronize: isProduction,
    },
  };
};
