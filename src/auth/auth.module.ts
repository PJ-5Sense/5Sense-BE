import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { AuthDao } from './dao/auth.dao';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentModule } from 'src/environment/environment.module';
import { ConfigService } from '@nestjs/config';
import { KakaoLoginStrategy } from './strategies/kakao-login.strategy';
import { AUTH_SERVICE } from './auth.service.interface';
import { AUTH_DAO } from './dao/auth.dao.interface';
import { GoogleLoginStrategy } from './strategies/google-login.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    UserModule,
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get('JWT');
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: AUTH_SERVICE, useClass: AuthService },
    { provide: AUTH_DAO, useClass: AuthDao },
    KakaoLoginStrategy,
    GoogleLoginStrategy,
  ],
})
export class AuthModule {}
