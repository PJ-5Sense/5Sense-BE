import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseTeacherDetailDTO } from 'src/feature-modules/teacher/dto/response/teacher-detail.dto';
import { ResponseTeacherDTO } from 'src/feature-modules/teacher/dto/response/teacher.dto';

export function SwaggerCreateTeacher() {
  return applyDecorators(
    ApiOperation({
      summary: '강사 등록',
      description: `<h2>강사 등록하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseTeacherDTO }),
  );
}

export function SwaggerFindManyTeacher() {
  return applyDecorators(
    ApiOperation({
      summary: '강사 목록',
      description: `<h2>강사 목록 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({
      status: 200,
      type: ResponseTeacherDTO,
      isArray: true,
      description: '강사 목록은 배열로 반환합니다. - 무한 스크롤 적용됨',
    }),
  );
}

export function SwaggerTeacherDetail() {
  return applyDecorators(
    ApiOperation({
      summary: '강사 정보 디테일',
      description: `<h2>강사 디테일 정보 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseTeacherDetailDTO }),
  );
}

export function SwaggerUpdateTeacher() {
  return applyDecorators(
    ApiOperation({
      summary: '강사 정보 수정',
      description: `<h2>강사 정보 수정하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseTeacherDetailDTO }),
  );
}
