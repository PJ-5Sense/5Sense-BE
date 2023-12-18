import { Controller, Post, Body, Inject, Param, ParseEnumPipe, BadRequestException } from '@nestjs/common';
import { socialLoginDto } from './dto/request/kakao-login.dto';
import { SocialType } from './types/social.type';
import { AUTH_SERVICE, IAuthService } from './auth.service.interface';

const customPipeErrorMessage = {
  exceptionFactory: () =>
    new BadRequestException(
      `Invalid Params [ Path : auth/{Param}/login ], [ Require Params : (${Object.values(SocialType)}) ]`,
    ),
};

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: IAuthService) {}

  @Post(':socialType/login')
  async kakaoLogin(
    @Param('socialType', new ParseEnumPipe(SocialType, customPipeErrorMessage))
    socialType: SocialType,
    @Body() kakaoDto: socialLoginDto,
  ) {
    const { code, state } = kakaoDto;

    const data = await this.authService.socialLogin(socialType, code, state);
    return { success: true, message: `Success ${socialType} Social Login`, data };
  }
}
