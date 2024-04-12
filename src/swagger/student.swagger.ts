import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseStudentDTO } from 'src/feature-modules/student/dto/response/create-student.dto';

export function SwaggerCreateStudent() {
  return applyDecorators(
    ApiOperation({
      summary: '학생 등록',
      description: `<h2>학생 등록하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseStudentDTO }),
  );
}

export function SwaggerFindManyStudent() {
  return applyDecorators(
    ApiOperation({
      summary: '학생 목록',
      description: `<h2>학생 목록 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseStudentDTO, description: '학생 목록은 배열로 반환합니다.' }),
  );
}

export function SwaggerStudentDetail() {
  return applyDecorators(
    ApiOperation({
      summary: '학생 정보 디테일',
      description: `<h2>학생 디테일 정보 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseStudentDTO }),
  );
}

export function SwaggerUpdateStudent() {
  return applyDecorators(
    ApiOperation({
      summary: '학생 정보 수정',
      description: `<h2>학생 정보 수정하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseStudentDTO }),
  );
}
