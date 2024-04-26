import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseCreateStudentDTO } from 'src/feature-modules/student/dto/response/create-student.dto';
import { ResponseFindManyForStudentDTO } from 'src/feature-modules/student/dto/response/find-many-for-lesson-student-dto';
import { ResponseFindManyStudentDTO } from 'src/feature-modules/student/dto/response/find-many-student.dto';
import { ResponseStudentDetailDTO } from 'src/feature-modules/student/dto/response/student-detail.dto';

export function SwaggerCreateStudent() {
  return applyDecorators(
    ApiOperation({
      summary: '학생 등록',
      description: `<h2>학생 등록하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseCreateStudentDTO }),
  );
}

export function SwaggerFindManyStudent() {
  return applyDecorators(
    ApiOperation({
      summary: '학생 목록',
      description: `<h2>학생 목록 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({
      status: 200,
      type: ResponseFindManyStudentDTO,
      isArray: true,
    }),
  );
}

export function SwaggerFindManyStudentForLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '특정 클래스에 등록 가능한 학생 목록',
      description: `<h2>특정 클래스에 등록 가능한 학생 목록</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({
      status: 200,
      type: ResponseFindManyForStudentDTO,
      isArray: true,
    }),
  );
}

export function SwaggerStudentDetail() {
  return applyDecorators(
    ApiOperation({
      summary: '학생 정보 디테일',
      description: `<h2>학생 디테일 정보 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseStudentDetailDTO }),
  );
}

export function SwaggerUpdateStudent() {
  return applyDecorators(
    ApiOperation({
      summary: '학생 정보 수정',
      description: `<h2>학생 정보 수정하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseFindManyStudentDTO }),
  );
}
