import {
  Controller,
  Post,
  Body,
  Inject,
  Param,
  ParseEnumPipe,
  BadRequestException,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { socialLoginDto } from './dto/request/social-login.dto';
import { SocialType } from './types/social.type';
import { AUTH_SERVICE, IAuthService } from './auth.service.interface';
import { Public } from 'src/common/decorator/public.decorator';
import { RefreshTokenGuard } from 'src/common/guards/reissue-jwt.guard';
import { User } from 'src/common/decorator/user.decorator';
import { JwtPayload } from './types/jwt-payload.type';

const customPipeErrorMessage = {
  exceptionFactory: () =>
    new BadRequestException(
      `Invalid Params [ Path : auth/{Param}/login ], [ Require Params : (${Object.values(SocialType)}) ]`,
    ),
};

@Public()
@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: IAuthService) {}

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
    @User() jwtInfo: JwtPayload,
  ) {
    return {
      success: true,
      message: 'Jwt token reissue is successful',
      data: await this.authService.reissueAccessToken(userAgent, refreshToken, jwtInfo),
    };
  }
}
