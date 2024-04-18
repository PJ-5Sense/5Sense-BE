import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseGetDetailSessionLessonDTO } from 'src/feature-modules/session-lesson/dto/response/get-detail-lesson.dto';

export function SwaggerCreateSessionLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 등록',
      description: `<h2>클래스 등록하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 201 }),
  );
}

export function SwaggerSessionLessonDetail() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 상세 정보',
      description: `<h2>클래스 상세 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseGetDetailSessionLessonDTO }),
  );
}

export function SwaggerUpdateLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 정보 업데이트',
      description: `<h2>클래스 정보 업데이트</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerCloseLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 정보 업데이트',
      description: `<h2>클래스 정보 업데이트</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}
