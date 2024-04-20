import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function SwaggerCreateLessonRoom() {
  return applyDecorators(
    ApiOperation({
      summary: '룸 생성',
      description: `<h2>룸 생성하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerUpdateLessonRoom() {
  return applyDecorators(
    ApiOperation({
      summary: '룸 정보 수정',
      description: `<h2>룸 정보 수정하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerDeleteLessonRoom() {
  return applyDecorators(
    ApiOperation({
      summary: '룸 삭제',
      description: `<h2>룸 삭제 수정하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}
