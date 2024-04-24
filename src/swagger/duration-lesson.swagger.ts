import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FindManyLessonDTO } from 'src/feature-modules/duration-lesson/dto/response/find-many-lesson.dto';
import { ResponseGetDetailDurationLessonDTO } from 'src/feature-modules/duration-lesson/dto/response/get-detail-lesson.dto';

export function SwaggerCreateDurationLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 등록',
      description: `<h2>기간반 클래스 등록하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 201 }),
  );
}
export function SwaggerFindManyDurationLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 목록 가져오기',
      description: `<h2>학생이 클래스 추가할 때 사용되는 목록 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 201, type: FindManyLessonDTO, isArray: true }),
  );
}

export function SwaggerDurationLessonDetail() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 상세 정보',
      description: `<h2>클래스 상세 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseGetDetailDurationLessonDTO }),
  );
}

export function SwaggerUpdateDurationLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 정보 업데이트',
      description: `<h2>클래스 정보 업데이트</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerCloseDurationLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 정보 업데이트',
      description: `<h2>클래스 정보 업데이트</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerCreateDurationLessonRegistration() {
  return applyDecorators(
    ApiOperation({
      summary: '기간반 클래스 추가',
      description: `<h2>학생이 기간반 클래스 추가하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}
