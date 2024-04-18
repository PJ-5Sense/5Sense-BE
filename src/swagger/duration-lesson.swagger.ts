import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseGetDetailDurationLessonDTO } from 'src/feature-modules/duration-lesson/dto/response/get-detail-lesson.dto';

export function SwaggerCreateLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 등록',
      description: `<h2>기간반 클래스 등록하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 201 }),
  );
}

export function SwaggerLessonDetail() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 상세 정보',
      description: `<h2>클래스 상세 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseGetDetailDurationLessonDTO }),
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
