import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { socialLoginDto } from './dto/create-auth.dto';
import { SocialLoginType } from './types/social.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('kakao/login')
  async kakaoLog1in(@Body() kakaoDto: socialLoginDto) {
    const code = kakaoDto.code;
    const state = 'taesik';
    console.log('인가코드 받기 성공');
    return await this.authService.socialLogin(SocialLoginType.KAKAO, code, state);
  }
}
