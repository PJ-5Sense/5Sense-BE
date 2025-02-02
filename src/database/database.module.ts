import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get('DATABASE'),
          autoLoadEntities: true,
          timezone: process.env.DB_TZ,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
