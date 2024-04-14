import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { PaginatedResponseFilteredLessonDTO } from 'src/feature-modules/lesson/dto/response/pagenation-response.dto';
import { DurationLessonDTO, SessionLessonDTO } from 'src/feature-modules/lesson/dto/request/create-lesson.dto';

export function SwaggerCreateLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 등록',
      description: `<h2>클래스 등록하기</h2>
      <br>**type이 duration인 경우 durationLesson이 필수**
      <br>**type이 session인 경우 sessionLesson이 필수**`,
    }),
    ApiExtraModels(DurationLessonDTO, SessionLessonDTO),
    ApiBody({
      description: '클래스 종류에 따라 다른 데이터를 입력합니다.',
      schema: {
        oneOf: [
          {
            $ref: getSchemaPath(DurationLessonDTO),
          },
          {
            $ref: getSchemaPath(SessionLessonDTO),
          },
        ],
      },
      examples: {
        duration: {
          value: {
            type: 'duration',
            name: 'string',
            memo: 'string',
            tuitionFee: 0,
            category: {
              id: 0,
              name: 'string',
            },
            teacherId: 0,
            schedules: {
              startDate: '2024-04-14T13:42:06.561Z',
              endDate: '2024-04-14T13:42:06.561Z',
              startTime: '10:00',
              endTime: '11:00',
              repeatDate: '월,화,수,목,금',
              lessonTime: 0,
              roomId: 0,
            },
          },
        },
        session: {
          value: {
            type: 'session',
            name: 'string',
            memo: 'string',
            lessonTime: 0,
            tuitionFee: 0,
            capacity: 0,
            totalSessions: 0,
            category: {
              id: 0,
              name: 'string',
            },
            teacherId: 0,
          },
        },
      },
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
