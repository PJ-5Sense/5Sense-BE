import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { socialLoginDTO } from '../../feature-modules/auth/dto/request/social-login.dto';
import { ResponseSocialLoginDTO } from '../../feature-modules/auth/dto/response/social-login.dto';
import { ResponseReissueDTO } from '../../feature-modules/auth/dto/response/reissue.dto';

export function SwaggerSocialLogin() {
  return applyDecorators(
    ApiOperation({
      summary: '소셜로그인을 통한 회원가입/로그인',
      description: `<h2>꼭 스웨거를 통해서 발급된 토큰을 사용해야 정상 이용 가능합니다. 보고 넘기지마세요! </h2>
      <h3><br>소셜로그인을 통한 회원가입/로그인이며 인가코드를 제공해야함<br>
      스웨거 테스트에서는 user-agent 입력하지 마세요!</h3>
      `,
    }),
    ApiBody({
      type: socialLoginDTO,
      description: `<br>1.code는 프론트에서 발급 프로세스 진행 필요
      <br>2.state는 토큰 발급에 사용한 state값을 동일하게 사용`,
    }),
    ApiHeader({
      name: 'user-agent',
      required: false,
    }),
    ApiOkResponse({ status: 200, type: ResponseSocialLoginDTO }),
  );
}

export function SwaggerReissue() {
  return applyDecorators(
    ApiOperation({
      summary: '엑세스 토큰 재발급',
      description: `<h2>리프레쉬 토큰을 이용하여 엑세스 토큰 재발급</h2>
      <br>스웨거 테스트에서는 authorization, user-agent 입력하지 마세요!
      `,
    }),
    ApiBearerAuth('RefreshToken'),
    ApiHeader({
      name: 'authorization',
      required: false,
    }),
    ApiHeader({
      name: 'user-agent',
      required: false,
    }),
    ApiOkResponse({ status: 200, type: ResponseReissueDTO }),
  );
}

export function SwaggerCancelMembership() {
  return applyDecorators(
    ApiOperation({
      summary: '회원 탈퇴',
      description: `<h2>회원 탈퇴 시 이메일 정보를 입력해야함</h2>`,
    }),
    ApiBearerAuth('RefreshToken'),
    ApiHeader({
      name: 'authorization',
      required: false,
    }),
    ApiOkResponse({ status: 200 }),
  );
}
