import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function SwaggerCreateDurationLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '기간반 클래스 등록',
      description: `<h2>기간반 클래스 등록하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 201 }),
  );
}

export function SwaggerDurationLessonDetail() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 상세 정보 - 미완',
      description: `<h2>클래스 상세 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    // ApiOkResponse({ status: 200, type: PaginatedResponseDTO }),
  );
}
