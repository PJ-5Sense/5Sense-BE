import { Controller, Post, Body, Param, ParseEnumPipe, BadRequestException, UseGuards, Headers } from '@nestjs/common';
import { socialLoginDto } from './dto/request/social-login.dto';
import { SocialType } from './type/social.type';
import { Public } from 'src/common/decorator/public.decorator';
import { RefreshTokenGuard } from 'src/common/guards/reissue-jwt.guard';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { JwtPayload } from './type/jwt-payload.type';
import { AuthService } from './auth.service';

const customPipeErrorMessage = {
  exceptionFactory: () =>
    new BadRequestException(
      `Invalid Params [ Path : auth/{Param}/login ], [ Require Params : (${Object.values(SocialType)}) ]`,
    ),
};

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':socialType/login')
  async kakaoLogin(
    @Param('socialType', new ParseEnumPipe(SocialType, customPipeErrorMessage))
    socialType: SocialType,
    @Body() socialDto: socialLoginDto,
    @Headers('user-agent') userAgent: string,
  ) {
    const { code, state } = socialDto;

    return {
      success: true,
      message: `Success ${socialType} Social Login`,
      data: await this.authService.socialLogin(socialType, code, state, userAgent),
    };
  }

  @Post('reissue')
  @UseGuards(RefreshTokenGuard)
  async reissueAccessToken(
    @Headers('user-agent') userAgent: string,
    @Headers('authorization') refreshToken: string,
    @CurrentUser() jwtInfo: JwtPayload,
  ) {
    return {
      success: true,
      message: 'Jwt token reissue is successful',
      data: await this.authService.reissueAccessToken(userAgent, refreshToken, jwtInfo),
    };
  }
}
