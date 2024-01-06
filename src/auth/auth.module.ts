import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { AuthDao } from './dao/auth.dao';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { KakaoLoginStrategy } from './strategies/kakao-login.strategy';
import { AUTH_SERVICE } from './auth.service.interface';
import { AUTH_DAO } from './dao/auth.dao.interface';
import { GoogleLoginStrategy } from './strategies/google-login.strategy';
import { NaverLoginStrategy } from './strategies/naver-login.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), UserModule, JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [
    { provide: AUTH_SERVICE, useClass: AuthService },
    { provide: AUTH_DAO, useClass: AuthDao },
    KakaoLoginStrategy,
    GoogleLoginStrategy,
    NaverLoginStrategy,
  ],
})
export class AuthModule {}
