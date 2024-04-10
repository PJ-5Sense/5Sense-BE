import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entity/auth.entity';
import { UserModule } from 'src/feature-modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { KakaoLoginStrategy } from './strategy/kakao-login.strategy';
import { GoogleLoginStrategy } from './strategy/google-login.strategy';
import { NaverLoginStrategy } from './strategy/naver-login.strategy';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), UserModule, JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, KakaoLoginStrategy, GoogleLoginStrategy, NaverLoginStrategy],
})
export class AuthModule {}
