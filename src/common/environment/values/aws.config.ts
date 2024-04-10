import { IsString, IsUrl } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class AwsConfig {
  @IsString()
  AWS_REGION: string;

  @IsString()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  AWS_S3_BUCKET: string;

  @IsUrl()
  AWS_S3_BASE_URL: string;

  @IsString()
  AWS_S3_BASE_OBJECT_KEY: string;
}

export default () => {
  const env = {
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AWS_S3_BASE_URL: process.env.AWS_S3_BASE_URL,
    AWS_S3_BASE_OBJECT_KEY: process.env.AWS_S3_BASE_OBJECT_KEY,
  };

  ValidateConfig(env, AwsConfig);

  const S3_CONFIG = {
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  };

  return {
    AWS_CONFIG: env,
    S3_CONFIG,
  };
};
