import { Controller, Post, Body, Param, UseGuards, Headers, Delete } from '@nestjs/common';
import { SocialTypeDTO, socialLoginDTO } from './dto/request/social-login.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { RefreshTokenGuard } from 'src/common/guard/reissue-jwt.guard';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { JwtPayload } from './type/jwt-payload.type';
import { AuthService } from './auth.service';
import { CancelMembershipDTO } from './dto/request/cancelMembership.dto';
import { SwaggerReissue, SwaggerSocialLogin } from '../../swagger/user/auth.swagger';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Auth - 인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SwaggerSocialLogin()
  @Post(':socialType/login')
  async socialLogin(
    @Param() socialTypeDTO: SocialTypeDTO,
    @Body() socialDto: socialLoginDTO,
    @Headers('user-agent') userAgent: string,
  ) {
    const { code, state } = socialDto;

    return {
      success: true,
      message: `Success ${socialTypeDTO.socialType} Social Login`,
      data: await this.authService.socialLogin(socialTypeDTO.socialType, code, state, userAgent),
    };
  }

  @SwaggerReissue()
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

  @Delete('cancelMembership')
  @UseGuards(RefreshTokenGuard)
  async cancelMembership(@Body() cancelMembershipDTO: CancelMembershipDTO, @CurrentUser('userId') userId: number) {
    await this.authService.cancelMembership(cancelMembershipDTO, userId);

    return {
      success: true,
      message: 'Successfully canceled Membership',
    };
  }
}
