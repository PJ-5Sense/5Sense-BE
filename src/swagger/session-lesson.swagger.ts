import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function SwaggerCreateSessionLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '회차반 클래스 등록',
      description: `<h2>회차반 클래스 등록하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 201 }),
  );
}

export function SwaggerSessionLessonDetail() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 상세 정보 - 미완',
      description: `<h2>클래스 상세 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    // ApiOkResponse({ status: 200, type: PaginatedResponseDTO }),
  );
}
