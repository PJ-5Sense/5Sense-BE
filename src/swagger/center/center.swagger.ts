import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseCenterDTO } from 'src/feature-modules/center/dto/response/create-center.dto';

export function SwaggerCreateCenter() {
  return applyDecorators(
    ApiOperation({
      summary: '센터 등록',
      description: `<h2>센터 등록하기 (센터는 두개 이상은 등록이 안됨)</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseCenterDTO }),
  );
}

export function SwaggerMyCenter() {
  return applyDecorators(
    ApiOperation({
      summary: 'My 센터 정보 조회',
      description: `<h2>My 센터 정보 조회하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseCenterDTO }),
  );
}

export function SwaggerUpdateCenter() {
  return applyDecorators(
    ApiOperation({
      summary: '센터 정보 업데이트',
      description: `<h2>센터 정보 업데이트 하기</h2>
      <br><h3>swagger 테스트 시, Send empty value 박스 체크 해제 필수!</h3>
      `,
    }),
    ApiBearerAuth('AccessToken'),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          mainPhone: {
            type: 'string',
          },
          open: {
            type: 'string',
          },
          close: {
            type: 'string',
          },
          profile: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiOkResponse({ status: 200, type: ResponseCenterDTO }),
  );
}
