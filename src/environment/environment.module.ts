import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './values/database.config';
import appConfig from './values/app.config';
import kakaoConfig from './values/kakao.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [databaseConfig, appConfig, kakaoConfig],
    }),
  ],
})
export class EnvironmentModule {}
