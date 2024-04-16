import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PaginatedResponseFilteredLessonDTO } from 'src/feature-modules/lesson/dto/response/pagenation-response.dto';

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

export function SwaggerFindByFilterLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 목록 가져오기 (클래스 관리 페이지)',
      description: `<h2>클래스 관리 페이지에서 클래스 목록 가져오기</h2>
        <br>**type이 duration인 경우 durationLesson이 필수**
        <br>**type이 session인 경우 sessionLesson이 필수**`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: PaginatedResponseFilteredLessonDTO }),
  );
}

export function SwaggerLessonDetail() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 상세 정보 - 미완',
      description: `<h2>클래스 상세 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    // ApiOkResponse({ status: 200, type: PaginatedResponseDTO }),
  );
}
