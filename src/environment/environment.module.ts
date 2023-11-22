import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './values/database.config';
import appConfig from './values/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [databaseConfig, appConfig],
    }),
  ],
})
export class EnvironmentModule {}
