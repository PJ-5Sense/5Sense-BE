import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseFindManySessionLessonDTO } from 'src/feature-modules/session-lesson/dto/response/find-many-lesson.dto';
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

export function SwaggerFindManySessionLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 목록 가져오기',
      description: `<h2>학생이 클래스 추가할 때 사용되는 목록 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 201, type: ResponseFindManySessionLessonDTO, isArray: true }),
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

export function SwaggerUpdateSessionLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 정보 업데이트',
      description: `<h2>클래스 정보 업데이트</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerCloseSessionLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 정보 업데이트',
      description: `<h2>클래스 정보 업데이트</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerCreateSessionLessonRegistration() {
  return applyDecorators(
    ApiOperation({
      summary: '회차반 클래스 추가',
      description: `<h2>학생이 차반 클래스 추가하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerCreateSessionLessonSchedule() {
  return applyDecorators(
    ApiOperation({
      summary: '회차반 일정 추가(예약)',
      description: `<h2>회차반 일정 추가하기 (예약하기)</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}
