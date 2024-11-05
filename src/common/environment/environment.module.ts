import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './values/database.config';
import appConfig from './values/app.config';
import kakaoConfig from './values/kakao.config';
import jwtConfig from './values/jwt.config';
import googleConfig from './values/google.config';
import naverConfig from './values/naver.config';
import awsConfig from './values/aws.config';
import constantConfig from './values/constant.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [databaseConfig, appConfig, jwtConfig, kakaoConfig, googleConfig, naverConfig, awsConfig, constantConfig],
    }),
  ],
})
export class EnvironmentModule {}
