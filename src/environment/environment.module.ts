import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './values/database.config';
import appConfig from './values/app.config';
import kakaoConfig from './values/kakao.config';
import jwtConfig from './values/jwt.config';
import googleConfig from './values/google.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [databaseConfig, appConfig, jwtConfig, kakaoConfig, googleConfig],
    }),
  ],
})
export class EnvironmentModule {}
