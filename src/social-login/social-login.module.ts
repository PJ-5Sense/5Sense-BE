import { Module } from '@nestjs/common';
import { SocialLoginService } from './social-login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialLoginEntity } from './entities/social-login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialLoginEntity])],
  providers: [SocialLoginService],
  exports: [SocialLoginService],
})
export class SocialLoginModule {}
