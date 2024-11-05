import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseRoomScheduleRangeDTO } from 'src/feature-modules/lesson-room/dto/response/room-schedule-range.dto';
import { ResponseRoomScheduleDTO } from 'src/feature-modules/lesson-room/dto/response/room-schedule.dto';

export function SwaggerCreateLessonRoom() {
  return applyDecorators(
    ApiOperation({
      summary: '룸 생성',
      description: `<h2>룸 생성하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerUpdateLessonRoom() {
  return applyDecorators(
    ApiOperation({
      summary: '룸 정보 수정',
      description: `<h2>룸 정보 수정하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerDeleteLessonRoom() {
  return applyDecorators(
    ApiOperation({
      summary: '룸 삭제',
      description: `<h2>룸 삭제 수정하기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200 }),
  );
}

export function SwaggerGetDailyLessonRoomSchedule() {
  return applyDecorators(
    ApiOperation({
      summary: '룸 예약 정보 가져오기 (daily)',
      description: `<h2>룸 예약 하루 기준 정보 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseRoomScheduleDTO, isArray: true }),
  );
}

export function SwaggerGetRangeLessonRoomScheduleWithRange() {
  return applyDecorators(
    ApiOperation({
      summary: '룸 예약 정보 가져오기 (range)',
      description: `<h2>룸 예약 해당 기간 기준 정보 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseRoomScheduleRangeDTO, isArray: true }),
  );
}
